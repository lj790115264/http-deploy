var http = require("http");
var fs = require("fs");
var deploy = require("./deploy.js");

module.exports = (req, res, url, file) => {
    var request = http.request(url, function(response) {
        /**
         * 判断下载的资源文件是否存在
         */
        if (response.statusCode != 200) {
            res.send("文件不存在");
            res.status(404).end();
            return;
        }
        var fileBuff = [];
        
        /**
         * 使用字节下载文件
         */
        response.on('data', function (chunk) {
            var buffer = new Buffer(chunk);
            fileBuff.push(buffer);
        });     

        response.on('end', function() {
            var totalBuff = Buffer.concat(fileBuff);
            fs.writeFile(file, totalBuff, function(err){
                if (err) {             
                    res.send(err);
                    res.end();
                } else {
                    // 向部署的代码中传入文件名，给bat脚本执行
                    var bat = deploy(file);
                    // 执行部署
                    bat(() => {
                        res.send("部署成功");
                        res.end();
                    })                   
                }            
            });             
        });
    })
    request.on('error', function(e){
        res.send(e);
        res.end();
    });
    request.end();
}
