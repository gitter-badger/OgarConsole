'use strict'

// OgarConsole Settings
function OgarConsoleSettings(){
	
	// OgarConsole Port
	this.serverPort = 1000;
	
	// Advanced Mode (NOT RECOMMENDED TO BE TRUE)
	this.advanced = false;

	// Console Log > Set 'ServerLogLevel = 1' in gamesettings.ini, Else, You will get OgarConsole errors.
	this.log = "./logs/console.log";
	
	// OgarConsole PHP File
	this.consoleFile = "/cmd.php";
	
	// OgarConsole package.json. **REQUIRED**
	this.json = require("./package.json");
	
	// OgarConsole Version
	this.version = this.json.version;
	
}

//
// DO NOT EDIT BELOW
//

var ogar = require('./index'),
settings = new OgarConsoleSettings(),
gameServer = ogar.gameServer,
express = require("express"),
app = express(),
fs = require("fs"),
server = require('http').createServer(app),
io = require("socket.io").listen(server),
exec = require('child_process').exec;

//
// DO NOT EDIT ABOVE
//

// Create new connection, and listen on port serverPort.
server.listen(settings.serverPort);
console.log("[OgarConsole] Running on port " + settings.serverPort);

app.set("title", "OgarConsole > " + settings.version);

// OgarConsole Server Start Error
server.on('error', function(err){
	
	console.log("[OgarConsole] Could not listen on port " + settings.serverPort + ". Try using a different port.");
    console.log("[Console] Ogar and OgarConsole stopped..");
    gameServer.socketServer.close();
    process.exit(1);
	return;
	
});

// OgarConsole Listen For Connections.
app.get("/", function(req, res) {
    fs.readFile(__dirname + settings.consoleFile, function(err, data) {
        res.send("" + data);
    });
});

// OgarConsole Socket Connection.
io.sockets.on("connection", function(socket) {
	
    socket.on("commandex", function(data) {
		
        if (!settings.advanced) {
			
            try {
                gameServer.log.onCommand(data);
				
                if (data === "") {
                    return;
                }
				
                var split = data.split(" ");
                var first = split[0].toLowerCase();
                var execute = gameServer.commands[first];
				
				if(first === "clr" || first === "clear"){
					
					fs.truncate(settings.log, "", function(){})
					return;
					
				}
				
                if (typeof execute != 'undefined') {
					
                    execute(gameServer, split);
					
                    fs.readFile(settings.log, function(
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
			
			// Advanced Mode.. Executes pure cmd commands, instead of Ogar game commands.
			// This is very dangerous to have enabled, this could leave serious damage to your server
			// If you don't know what you are doing. Please keep advanced mode false, unless you know what you
			// Are doing!.
			
			exec(data, function(e,s,t){
				
				socket.emit("input", s);
				return;
				
			});
			
		}
    });
});

// Set CMD Title 
exec("title OgarConsole " + settings.version + "/ Port " + settings.serverPort, function(e, s, t) {})



//
// END OF FILE
//
