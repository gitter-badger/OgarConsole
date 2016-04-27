'use strict'
// Consle Port - Port Ogar console will listen on.
var serverport = 1000,
	// Advaned Mode - Execute cmd commands (NOT RECOMMENDED TO BE TRUE)
    advanced = false,	
	// Log File - Reads console log, output console log to OgarConsole. Enable Server Logging.
	log = "./logs/console.log",
    // Start Script for Ogar
    ogar = require('./index'),
	json = require("./package.json"),
	version = json.version,
	// GameServer
	gameServer = ogar.gameServer,
    express = require("express"),
    app = express(),
    fs = require("fs"),
    server = require('http').createServer(app),
    io = require("socket.io").listen(server),
    exec = require('child_process').exec;
	
// Run Ogar
// Add command handler

// Listen for console
server.listen(serverport);
console.log("[Console] Console running port " + serverport);

// HTTP Listen.
app.get("/", function(req, res) {
    fs.readFile(__dirname + "/cmd.php", function(err, data) {
        res.send("" + data);
    });
});

var logThis;

io.sockets.on("connection", function(socket) {
	
    socket.on("commandex", function(data) {
		
        if (!advanced) {
			
            try {
                gameServer.log.onCommand(data);
				
                if (data === "") {
                    return;
                }
				
                var split = data.split(" ");
                var first = split[0].toLowerCase();
                var execute = gameServer.commands[first];
				
				if(first === "clr" || first === "clear"){
					
					fs.truncate(log, "", function(){ })
					return;
					
				}
				
                if (typeof execute != 'undefined') {
					
                    execute(gameServer, split);
					
                    fs.readFile(log, function(
                        err, data) {
                        var a = data.toString();
                        var clog = a.split("\n");
                        socket.emit("input", a);
                    });
					
                } else {
					
                    console.log("[Console] Invalid Command, try 'help' for a list of commands.");
					
                }
            } catch (e) {
				
                console.log("[ERROR] Oh my, there seems to be an error with the command " + first);
                console.log("[ERROR] Please alert AJS dev with this message:\n" + e);
				
            }
        }else{
			
			exec(data, function(e,s,t){
				
				socket.emit("input", s);
				return;
				
			});
			
		}
    });
});
exec("title OgarConsole " + version + "/ Port " + serverport, function(e, s, t) {})
