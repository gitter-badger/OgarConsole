# OgarConsole

OgarConsole Server Controller.
Ogar ONLY. Ogar Unlimited coming soon.

*Installation*

1. Download OgarConsole
2. Upload OgarConsole to Ogar game directory
3. Run command 'npm install' or install (Dependencies(express, socket.io, fs, http))
4. Change console port in 'cmd.js'. Default (1000)

*REQUIRED*
In './index.js' add the code below under 'var gameServer = new GameServer()'

'exports.gameServer = gameServer;'

Run 'startconsole.bat'

open browser to http://127.0.0.1:1000

You will now have a console to run your game from in browser.
