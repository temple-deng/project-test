'use strict'

var express = require('express');
var app = express();
var fs = require("fs");
var path = require("path");
var bodyParser = require('body-parser');
var open = require('open');

app.use('/',express.static("./"));

app.use('/api/list',bodyParser.urlencoded({extended: true}));

app.get("/api/list", function(req,res,next){
    var stream = fs.createReadStream(path.join(__dirname, "list.json"), "utf-8");
    stream.pipe(res);
});

app.post("/api/list", function(req, res, next){
    fs.readFile(path.join(__dirname, "list.json"), function(err, data){
       if(err){
           next(err);
       }
       const list = JSON.parse(data);
        if(req.body.index != null){
            const index = req.body.index;
            const operation = req.body.operation;
            if(operation == "start"){
                const time = new Date();
                const startTime = time.toLocaleDateString().replace(/\//g,"-");
                list[index].status = "started";
                list[index].startTime = startTime;
                list[index].operation.start = true;
            }
            else {
                const time = new Date();
                const endTime = time.toLocaleDateString().replace(/\//g,"-");
                list[index].status = "finished";
                list[index].endTime = endTime;
                list[index].operation.finished = true;
            }
        }
        else {
            const item = {
                name: req.body.name,
                createTime: req.body.createTime,
                status: req.body.status,
                startTime: req.body.startTime == "null" ?null:req.body.startTime,
                endTime: req.body.endTime == "null" ?null:req.body.endTime,
                operation: {
                    start: req.body.operation.start == "true",
                    finished: req.body.operation.finished == "true",
                    delete: req.body.operation.delete == "true"
                }
            };
            list.push(item);
        }


        let stream = fs.createWriteStream(path.join(__dirname, "list.json"));
        stream.write(JSON.stringify(list,null,2));
        res.status = 200;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("操作成功\n");
    });
});

app.delete("/api/list", function(req, res, next){
    fs.readFile(path.join(__dirname, "list.json"), function(err, data){
        if(err){
            next(err);
        }
        const list = JSON.parse(data);
        const index = req.body.index;
        list.splice(index,1);

        let stream = fs.createWriteStream(path.join(__dirname, "list.json"));
        stream.write(JSON.stringify(list,null,2));
        res.status = 200;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("删除成功\n");
    });
});

app.use(errorHandler);
function errorHandler(err, req, res, next){
    console.log(err.message);
    res.status = 500;
    res.end(err.message);
}

app.listen(8080,function(){
    console.log("Server star at port 8080");
    open('http://localhost:8080', 'firefox');
});

