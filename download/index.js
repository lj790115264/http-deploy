var express = require("express");
var fs = require("fs");
var path = require("path");
var app = express();

app.listen(3000);

app.get("/download/:uri", function(req, res, next) {
    // 需要下载的文件名
    var filename = req.params.uri;
    var downloadUri = path.join(__dirname, "./download/", filename);
    /**
     * 使用express封装的方法提供文件下载
     */
    res.download(downloadUri, filename, (err) => {      
        if (err) {
            console.log(err);
            res.status(500).end();
        }
    });
})