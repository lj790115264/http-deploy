var express = require("express");
var download = require("./download.js");

var app = express();
// 下载架包的地址
var url = "http://172.17.10.17:3000/download/";

// 存在架包的地方
var file = "./download/";

app.get("/deploy/:uri", (req, res, next) => {
    
    // 架包的文件名
    var filename = req.params.uri;
    // 下载架包并执行脚本部署，保存进程号
    download(req, res, url + filename, file + filename)
})

// 监听的端口号
app.listen(10251);
