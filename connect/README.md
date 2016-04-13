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
  
