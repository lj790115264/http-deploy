var fs = require("fs");
var childProcess = require('child_process');
var path = require('path');
var spawn = childProcess.spawn;
var spawnSync = childProcess.spawnSync;

module.exports = function(filename) {

	function doJar(callback) {
		// 执行脚本 单独创建一个子进程，让子进程脱离主进程 
		var jar = spawn("jar.bat", [filename], {
			 	detached: true,
			 	stdio: 'ignore'
			 });
		// 将进程号写进文件中
		fs.writeFile(path.join(__dirname, 'port.txt'), jar.pid, function() {
			callback();
			jar.unref();		
		})
	}
	return function(callback) {
		fs.readFile(path.join(__dirname, 'port.txt'), "utf-8", function(err, str) {
			/**
			 * 如果进程号存在，则杀死该进程号
			 */
			if (str) {
				spawnSync("taskkill", ["/pid", str, "-t", "-f"]);
			}
			doJar(callback);
		})
	}
	
}
