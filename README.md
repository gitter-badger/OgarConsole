# OgarConsole

OgarConsole Server Controller.

#Supported Servers

Ogar tested - works

Ogar Unlimited tested - works

Ogar-Plus tested - works (Change serverLogLevel = 1)


[Install The Game Before Installing OgarConsole]

*Installation*

1. Download OgarConsole
2. Upload OgarConsole prior to your Ogar or Ogar Unlimited game directory
3. Run command 'npm install' or install (Dependencies(express, socket.io, fs, http))
4. Change console port in 'cmd.js'. Default (1000)

Run 'startconsole.bat'

open browser to http://127.0.0.1:1000

You now have a running console for your server.

/
/
/

Neither Ogar nor Ogar Unlimited?

Instead of replacing the file index.js, simply place the code below under 'var gameServer = new GameServer();' in index.js

exports.gameServer = gameServer;
