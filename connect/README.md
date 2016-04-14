#    Connect
---
	1.cookie-parser中间件
---


###  1.cookie-parser中间件
#### 1.1 安装  
```javascript 
npm install cookie-parser
```
#### 1.2 API
##### cookieParser(secret, options)
+ secret: 字符串或者数组，可以被签名(signing)cookies使用，这是个可选的选项，如果没有说明便不会解析签名的cookies。如果传入字符串，会被当做秘钥使用。如果传入的是数组，那么会按序尝试用每一次秘钥去解析cookie。  
+ options: 传递给cookie.parse的对象。
<br>
<br>

### 2.body-parser
#### 2.1 基本知识
注意，这个中间件并不能解析multipart/form-data的数据现在。如果要解析这样的可以使用以下的模块：  
+ connect-busboy  
+ connect-multiparty  
+ formidable  
+ multer  

这个模块包括以下的解析器：  
+ JSON body parser  
+ Raw body parser  
+ Text body parser    
+ URL-encoded form body parser  


#### 2.2 API
bodyParser对象暴露出来多个工厂方法来创建中间件，所有的中间件都会把解析过的body内容填入到 req.body 里面，或者返回一个空对象如果没有可解析的内容，又或者返回err。

##### bodyParser.json(options)
返回一个只解析json数据的中间件。  

**options**   
这个函数接受一个可选的对象作为配置选项，可能包含下面的属性：  
+ inflate(解压缩)  
  默认为true. 设置为true时，被压缩过的body会被解压缩。false情况下，压缩的内容会被拒绝掉。  
+ limit  
  控制请求内容的最大长度。如果是数字，那这个值指的是字节数，如果是字符串，这个字符串会传给bytes库解析。默认是"100kb"  
+ reviver  
  这个选项会传给JSON.parse方法作为第二个参数。  
+ strict  
  默认为true. 设置为true时，仅仅接受数组和对象内容。如果是false则接受任意JSON.parse能接受的内容。  
+ type  
+ verify  

##### bodyParser.raw(options)
返回一个将body当做Buffer对象解析的中间件。  
返回新的body对象包含解析过的数据被填入到req.body里。 这是一个body的Buffer对象。  

**options**  
inflate、limit、type、verify.参数内容如上面。  

##### bodyParser.text(options)
将内容当string解析，返回新的string内容。 
 
**options**  
inflate、limit、type、verify  
+ defaultCharset  
  如果在Content-Type头部没有指定编码格式，这个选项设置编码格式。默认是utf-8.  

#####  bodyPareser.urlencoded(options)  
**options**  
+ extended  
  这个参数允许解析数据使用querystring库(when false)或者qs库(when true).默认是true.但通常建议传入false使用qs库，因为qs可以正确解析复杂的对象（多重嵌套）  
```javascript
// 内建对象 querystring
querystring.parse("info[name]=henry&info[age]=30&hobby[1]=sport&hobby[2]=coding") => 
  { 
    'info[name]': 'henry',
    'info[age]': '30',
    'hobby[1]': 'sport',
    'hobby[2]': 'coding'
  }

// 第三方插件 qs
qs.parse("info[name]=henry&info[age]=30&hobby[1]=sport&hobby[2]=coding") => 
  {
    info: {
      name: 'henry',
      age: '30'
    },
    hobby: [ 'sport', 'coding' ]
  }
``` 
inflate、limit、parameterLimit、type、verify  

#### 2.3 Errors  
本模块提供的中间件抛出的错误取决于解析时发生错误的情况，通常错误会有一个status属性包含了HTTP响应码，和body属性包含了已经解析了的body内容。  
+ **content encoding unsupported** 文本编码不支持，这个错误通常发生在请求设置了Content-Encoding头部，但是设置中间件的参数"inflate"设为false。 status码为415。   

+ **request aborted** 客户端在完全解析完body内容前主动放弃了请求。status码为400  

+ **request entity too large** 当body size大于limit选项时触发。limit属性被设置为limit选项设置的字节，length属性为请求body的长度。status码为413.  

+ **request size did not match content length** status码为400  

+ **stream encoding should not be set** 通常是因为req.setEncoding设置在调用body-parser中间件的前面。status码为500.

+ **unsupported charset "BOGUS(伪造的)"** 通常是因为Content-Type设定的编码参数不被 iconv-lite模块支持，或者解析器不支持。这个charset会被设置到charset属性，status码为415.  

+ **unsupported content encoding "bogus"**  和上面的差不多，Content-Encoding属性不支持，encoding被设置为encoding属性，status码为415.  

+ 文档上没有提到parameterLimit触发的err，当传入的参数个数多余parameterLimit设定的数值时也会报错。  
<br>
<br>


###  3.Busboy 或者 connect-busboy
busboy是处理mulitpart/form的模块。Busboy是一个可写流   
#### 3.1 API  
使用这个模块的时候，要先将req.headers传入到Bugboy的构造函数中，新建一个Busboy实例。
```javascript
var busboy = new Busboy({ headers: req.headers });
```
busboy可能触发的事件：
##### Events
+ file(< string >fieldname, < ReadableStream >stream, < string >filename, < string >transferEncoding, < string >mimeType)   
  当有file form元素时触发，如果监听了这个事件，就最好对 stream做出处理，或者简单的调用stream.resume(),否则finished事件永远不会触发。或者干脆不监听这个事件。  
+ field(< string >fieldname, < string >value, < boolean >fieldnameTruncated, < boolean >valueTruncated, < string >transferEncoding, < string >mimeType)  
  非文件字段触发事件。  
+ partsLimit() 当指定的 parts的limit达到限定时触发。 file 或者 filed事件将不再触发。  
+ filesLimit() 当指定的 files的limit达到限定时触发。 file 事件将不再触发。   
+ fieldsLimit()当指定的 fileds的limit达到限定时触发。 filed 事件将不再触发。   

##### 构造函数接受以下的配置  
+ headers - *object* - 请求的HTTP头部，可以被独立的解析器解析  
+ highWaterMark - *integer* - highWaterMark to use for this Busboy instance (Default: WritableStream default).  
+ fileHwm - *integer* - highWaterMark to use for file streams (Default: ReadableStream default).  
+ defCharset - *string* - Default character set to use when one isn't defined (Default: 'utf8').  
+ preservePath - *boolean* - If paths in the multipart 'filename' field shall be preserved. (Default: false).  
+ limits - *object* - Various limits on incoming data. Valid properties are:
  - fieldNameSize - *integer* - 字段名的最大长度 (字节) (默认: 100 字节).
  - fieldSize - *integer* - 字段值的最大长度 (字节)  (默认: 1MB).  
  - fields - *integer* - 非文件字段的最大数量 (Default: Infinity).
  - fileSize - *integer* - 对于multipart forms, 文件的最大尺寸 (字节) (Default: Infinity). 
  - files - *integer* - For multipart forms, the max number of file fields (Default: Infinity).  
  - parts - *integer* - For multipart forms, the max number of parts (fields + files) (Default: Infinity).
```javascript
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        file.on('data', function(data) {
            console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });
        file.on('end', function() {
            console.log('File [' + fieldname + '] Finished');
        });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    busboy.on('finish', function() {
        console.log('Done parsing form!');
        res.writeHead(303, { Connection: 'close', Location: '/index.html' });
        res.end();
    });
    req.pipe(busboy);
```  

### 3.compression
压缩响应的中间件


###  4.serve-favicon
为什么使用这个模块？  
+ 如果在日志中间件前面调用这个中间件，日志将不再记录对favicon的请求。  
+ 将icon在内存中缓存，改进硬盘的响应速度  
+ 基于icon提供ETag响应头  


#### 4.1 API  
##### favicon(path, options)  
**options**  
+ maxAge:用ms表示cache-control max-age指令的时间，默认是一年，也可以是一个字符串，会被ms模块解析  


###  5.connect-timeout
请求超时的中间件  
#### 5.1 API
当请求超过所给时间时，中间件会触发'timeout'事件，node将继续处理缓慢的请求直到请求关闭。请求将继续占用CPU和内存资源，即使我们在超时回调时返回HTTP响应。为了更好的使用这些资源，我们应该主动取消请求，或者直接关掉绑定的套接字socket.  
 
#####  timeout(time, [options])
time如果是数字的话就以ms为单位，或者传入一个能被ms模块解析的字符串  

**options**  
+ *respond* 控制这个模块是否应该通过转发error的方式来对请求"响应"。如果为true，超时错误会传递给next(),以便我们定制响应行为。error对象有timeout属性和status503的属性。默认为true.  

#####  req.clearTimeout()
清除请求的timeout。timeout会被完全移除，将来也不会再触发。  

##### req.timedout 
如果timeout事件触发就为true.  

<br>
<br>

###  6. response-time
记录服务器响应时间的中间件。响应时间的定义是当请求进入到这个中间件到写出响应头部所经过的时间。  

#### 6.1 API
#####  responseTime([options])  
创建一个中间件，该中间件可以在响应头部中添加一条 X-Response-Time的头部，如果不想用这个模块自动设定头部，请查看 responseTime(fn)  
**options**  
+ *digits* 在X-Response-Time头部的小数点后固定位数的数字。默认是3. 比如3.300ms。  
+ *header* 响应头部的名字，默认是 X-Response-Time .  
+ *suffix*  布尔值指定是否在时间的后面添加后缀。默认是true.比如 3.300ms vs 3.300.  

##### responseTime(fn)  
创建一个记录响应时间的中间件，可以传入自己的函数参数，函数有3个参数，分别是req， res, time。  


###  7.serve-static
提供静态资源的中间件
####  7.1  API  
##### serveStatic(root, options)
创建中间件提供root目录中的静态资源。提供的文件将取决于req.url和root目录。 如果文件没找到，中间件并不会发回404响应，而是调用next()函数转入到下一个中间件。  
**options**  
+ *dotfiles*  设置dotfiles如何处理。ditfiles就是.开头的文件或目录。注意这个检查是发生在路径自身身上，而不是去到硬盘的路径上检查。    
  - 'allow'  允许访问这样的文件  
  - 'deny'  拒绝这个请求通过 403/next()（到底是哪个。。。）  
  - 'ignore'  假装该文件并不存在 404/next()  
  默认值和ignore选项很相似，但是并不会忽略以.开头的目录里的文件。  

+ *etag*  启用或禁用etag，默认是true.  
+ *extensions*  设置文件后缀来作为折中的方案。 当设置了该项时，如果文件没找到，提供的extensions会被提交到文件名后面搜寻。找到的第一个匹配的文件会被提供。例如 ['html','htm'] ,默认值为false.注意这种添加是直接在文件名后添加，而不是替换后缀的方式。  
+ *fallthrough*  设置中间件当查询失败时应该当做一个未处理的请求交给下一个中间件处理还是直接提供一个客户端错误交给错误处理中间件处理。true时就是调用next()方法，false会调用next(err)。？？？(excuse me?)    
  通常来说期望设置为true,以便设置了多个静态资源目录时候不会在前几个目录查找失败时报错。默认值为true.  
+ *index*  默认情况下当请求一个目录时，会返回index.html文件作为响应。可以禁用这个选项，或者传递新的字符串或者数组的索引。  
+ *lastModified*  启用或禁用这个头部，默认是true,使用文件系统的时间。  
+ *maxAge* 提供ms级的max-age的http缓存，默认是0.也可以是ms模块可以解析的字符串。  
+ *redirect*  Redirect to trailing "/" when the pathname is a dir. Defaults to true.  
+ *setHeaders* 定制响应头部的函数，函数调用时有3个参数。  
  - res  响应对象
  - path  文件路径  
  - stat 文件的stat对象