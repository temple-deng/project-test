var connect = require('connect');
var fs = require('fs');
var bodyParser = require('body-parser');
var parse = require('url').parse;
var join = require('path').join;
var app = connect();

app.use(bodyParser.urlencoded({extended: false})).
    use('/upload', ajaxHandler).
    use(staticFile).
    use(errorHandler).listen(3000);

function ajaxHandler(req, res, next){
    console.log(req.body);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end('你输入的名字是：' + req.body.name +"\n你输入的年龄是: " + req.body.age);
}

function staticFile(req, res, next){
    var url = parse(req.url);
    console.log(url.pathname);
    var path = join(__dirname, url.pathname);
    var stream = fs.createReadStream(path);
    stream.on("error", function(error){
        next(error);
    });
    stream.pipe(res);
}

function errorHandler(err, req, res, next){
    if(err){
        console.log(err);
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end('Sorry, 服务器发生错误，请稍后再试');
    }
}