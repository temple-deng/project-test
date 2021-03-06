var connect = require('connect');
var fs = require('fs');
var parse = require('url').parse;
var join = require('path').join;
var app = connect();
var Busboy = require('busboy');
var responseTime = require('response-time');

app.use(responseTime(function(req, res, time){
    res.end('hahaha'+time);
})).
    use('/upload', ajaxHandler).
    use(staticFile).
    use(errorHandler).listen(3000);

function ajaxHandler(req, res, next){

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
        console.log('Field [' + fieldname + ']: value: ' + val);
    });
    busboy.on('finish', function() {
        console.log('Done parsing form!');
        (function() {
            var response = res;
            return function(){
                setTimeout(function () {
                response.setHeader("Content-Type", "text/html; charset=utf-8");
                response.end("\n所有内容上传完成\n");
                }, 3000);
            }
        })()();
    });


    req.pipe(busboy);
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