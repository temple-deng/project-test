###  1.TodoList 的demo
使用react + webpack +express 编写的一个TodoList的demo.  
主要试验下工具在使用过程中会出现的各种问题






<br>
<br>
### 2. 搭建环境
.babelrc
```javascript
{
	"presets": ["es2015","react"],
	"plugins":[]
}
```
安装babel语法预设
npm i -D babel-preset-es2015    
npm i -D babel-preset-react  
安装react和react-dom    
npm i -D react react-dom  
安装webpack-dev-serve(默认情况在8080端口起的server)  
npm i -D webpack-dev-server  
安装ESlint和Airbnb语法规则和eslint-loader   
npm i -D eslint  
npm i -D eslint-config-airbnb  
npn i -D eslint-loader
默认情况下airbnb语法检测ES6和react的语法，并且要求安装eslint-plugin-react   
npm i -D eslint-plugin-react  
.eslintrc,这里没有添加对react的检测，所以使用airbnb/base
```javascript
{
	"extends": "airbnb/base"
}
```
安装react HMR
npm i -D babel-preset-react-hmre

###  3.webpack dev server
webpack_dev_server应该是要和publicPath配置搭配起来用，server会在这个配置的相对路径处在内存中生成对应的文件，如果不加任何配置，server在文件修改后会重新编译，但是不会自动刷新。  
**自动刷新的问题**  下面的方法不见得每种都可以成功
+ 通过在命令行调用server时添加 --inline 参数开启自动刷新。（这种模式可能是在bundle文件中添加了socket连接，当服务器文件有改动的时候通过socket连接通知客户端刷新页面）。  
+ 手动在index.html文件里引入属性src="http://localhost:8080/webpack-dev-server.js"的script标签.    
+ 或者在配置文件里的入口配置数组里添加一个入口文件"webpack-dev-server/client?http://localhost:8080/"。    
+ 又好像可以单独在配置里添加devServer的配置，如下,但是这种模式好像在开启HMR时失败了（下面会提到还需要配置其他才能成功开启HMR）
```javascript
devServer: {
        historyApiFallback: true,
		hot:true
        inline: true,
        progress: true
    }
```

**Hot Module Replacement**  
+ 最简单的方式是启动server时候添加 --hot参数  
+ 修改配置文件，首先要添加入口点"webpack/hot/dev-server"， 其次添加new webpack.HotModuleReplacementPlugin()插件，最后开启上面的hot:true选项     
补充一个全栈刷新的文章链接：http://acgtofe.com/posts/2016/02/full-live-reload-for-express-with-webpack  

<br>
<br>