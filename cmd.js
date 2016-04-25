
// ./index is the start script.
var ogar = require('./index'),
express = require("express"),
app = express(),
fs = require("fs"),
server = require('http').createServer(app),
io = require("socket.io").listen(server),
cmd = require("node-cmd"),
exec = require('child_process').exec;

// Console Port
server.listen(1000);

console.log("[Console] Console running port 1000");

app.get("/", function(req, res){
	
	fs.readFile(__dirname + "/cmd.html", function(err, data){
		
		res.send("" + data);

	});
	
});

io.sockets.on("connection", function(socket){
	
	socket.on("commandex", function(data){
		
		
		exec(data, function(error, stdout, stderr){
			
			socket.emit("input", "&#013;&#010;&#013;&#010" + stdout + stderr);
			
		});
		
	});
	
});