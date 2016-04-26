'use strict'
// Console port.
var serverport = 1000,
    advanced = false,
    // ./index is the start script.
    ogar = require('./index'),
    express = require("express"),
    app = express(),
    fs = require("fs"),
    server = require('http').createServer(app),
    io = require("socket.io").listen(server),
    exec = require('child_process').exec;
// Run Ogar
// Add command handler
var gameServer = ogar.gameServer;
// Listen for console
server.listen(serverport);
console.log("[Console] Console running port " + serverport);
// HTTP Listen.
app.get("/", function(req, res) {
    fs.readFile(__dirname + "/cmd.html", function(err, data) {
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
                if (typeof execute != 'undefined') {
                    execute(gameServer, split);
                    fs.readFile("./logs/console.log", function(
                        err, data) {
                        var a = data.toString();
                        var clog = a.split("\n");
                        socket.emit("input", a);
                    })
                } else {
                    console.log(
                        "[Console] Invalid Command, try 'help' for a list of commands."
                    );
                }
            } catch (e) {
                console.log(
                    "[ERROR] Oh my, there seems to be an error with the command " +
                    first);
                console.log(
                    "[ERROR] Please alert AJS dev with this message:\n" +
                    e);
            }
        }
    });
});
exec("title OgarConsole 1.0.0 / Port " + serverport, function(e, s, t) {})
