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
