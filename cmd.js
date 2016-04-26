
// Console port.
var serverport = 1000,
advanced = false,
// ./index is the start script.
ogar = require('./index'),
express = require("express"),
Commands = require('./modules/CommandList'),
app = express(),
fs = require("fs"),
server = require('http').createServer(app),
io = require("socket.io").listen(server),
GameServer = require("./GameServer"),
exec = require('child_process').exec;

// Run Ogar
var gameServer = new GameServer();
var cache;
gameServer.start(ogar.Version);

// Add command handler
gameServer.commands = Commands.list;
module.exports = GameServer;

// Listen for console
server.listen(serverport);

console.log("[Console] Console running port " + serverport);

	// HTTP Listen.

	app.get("/", function(req, res){
		
		fs.readFile(__dirname + "/cmd.html", function(err, data){
			
			exec.send("" + data);
			
		
		});
		
	});

io.sockets.on("connection", function(socket){

	socket.on("commandex", function(data){
		
		if(!advanced){
			
			try{
				
				gameServer.log.onCommand(data);
				
				if(data === "") { return; }
				
				var split = data.split(" ");
				
				var first = split[0].toLowerCase();
				
				var execute = gameServer.commands[first];
				if(typeof execute != 'undefined'){
					
					execute(gameServer, split);
					
				}else{
					console.log("[Console] Invalid Command, try \u001B[33mhelp\u001B[0m for a list of commands.");
	  
					socket.emit("input", "&#013;&#010;" + "[Console] Invalid Command, try \u001B[33mhelp\u001B[0m for a list of commands.");
					
				}
				
			}catch(e){
				
				console.log("[ERROR] Oh my, there seems to be an error with the command " + first);
				console.log("[ERROR] Please alert AJS dev with this message:\n" + e);
				socket.emit("input", "&#013;&#010;&#013;&#010" + "[ERROR] Oh my, there seems to be an error with the command " + first);
				socket.emit("input", "&#013;&#010;&#013;&#010" + "[ERROR] Please alert AJS dev with this message:\n" + e);
				
			}
			
		}
		
		// Handy note.. Enable this to send cmd commands. BEWARE! IF ENABLED, Enable Advanced mode true
		
		/*
		
		exec(data, function(error, stdout, stderr){
	
			socket.emit("input", "&#013;&#010;&#013;&#010" + stdout + stderr);
			
			console.log("[Console] " + data);
			
		});
		
		*/
		
	});
	
	
});

exec("title OgarConsole 1.0.0 / Port " + serverport, function(e, s, t){})
