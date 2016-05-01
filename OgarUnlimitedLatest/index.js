// Imports
'use strict';
const Readline = require('readline');
const VERSION = '16.3.5';
const ControlServer = require('./core/ControlServer');
const controlServer = new ControlServer(VERSION);

exports.gameServer = controlServer;

//throw error
// Init variables
let showConsole = true;
// Handle arguments
process.argv.forEach(function (val) {
  if (val == "--noconsole") {
    showConsole = false;
  } else if (val == "--help") {
    console.log("Proper Usage: node index.js");
    console.log("    --noconsole         Disables the console");
    console.log("    --help              Help menu.");
    console.log("");
  }
});

// There is no stopping an exit so clean up
// NO ASYNC CODE HERE - only use SYNC or it will not happen
process.on('exit', (code) => {
  console.log("OgarUnlimited terminated with code: " + code);
  controlServer.stop();
});

// init/start the control server
controlServer.init();
controlServer.start();

// Initialize the server console
if (showConsole) {
  let streamsInterface = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  setTimeout(controlServer.getConsoleService().prompt(streamsInterface), 100);
}
