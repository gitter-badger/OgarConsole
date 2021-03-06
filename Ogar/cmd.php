<!DOCTYPE HTML>
<html>
<head>

    <title>OgarConsole</title>
	
    <script src="/socket.io/socket.io.js" type="text/javascript"></script>
    <script src= "https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
	
	<style>
		@import url(https://fonts.googleapis.com/css?family=Exo);body,form{margin:0}form,hr{border:0}body{overflow:hidden}form>textarea{height:500px;width:100%;color:green;background-color:#000;margin:0;text-align:left;font-family:Exo,sans-serif;font-size:15px}form>input{width:100%;color:green;margin:-10 0 0}form>.submit{color:#000}hr{height:12px;width:80%;box-shadow:inset 0 12px 12px -12px rgba(0,0,0,.5)}a{text-decoration:none;color:orange}.center{margin:0 auto;text-align:center}.help{display:none}
	</style>
	
</head>
<body>

    <div id="CMD">
	
        <form>
            <textarea class="console" name="console" readonly>Type 'help' for commands</textarea><br>
            <input class="input" name="input" placeholder="input" type="text"><br>
            <input class="submit" style="width: 100%;" type="submit" value="Send Command">
        </form>
		
		<br>
	</div>
		
	<div id="copyright">
		
		<div class="center">
			<hr/>
				
			<i>Created by <a href="/">LegitSoulja</a><br/>Sponser <a href="http://agariohub.tk">AgarioHub</a><br/><a href="https://github.com/LegitSoulja/OgarConsole">GitHub</a><i>
			
			<hr/>
			
		</div>
		
	</div>
    <script>
        
		$(document).ready(function() {
			
			var socket = io.connect();
			var output = $("textarea");
			var input = $(".input");
			var help = $(".help").html();
			var f = false;
			socket.on("disconnect", function(err) {
				output.append("\n" + "Console Disconnected.");
			});
			socket.on("connect", function(err) {
				output.append("\n" + "Console Connected.");
			})
			$("form").submit(function(e) {
				
				e.preventDefault();

				if (input.val() == "clr" || input.val() == "clear") {
					socket.emit("commandex", input.val());
					input.val('');
					output.empty();
					return;
				}
				socket.emit("commandex", input.val());
				input.val('');
				socket.on('input', function(data) {
					output.empty();
					output.append("\n" + data);
					$('textarea').scrollTop($('textarea')[0].scrollHeight);
				});
			});
		});
        
    </script><!-- CopyRight, LegitSoulja. In Use Of AgarioHub.TK Servers -->
     
    <!-- GITHUB >> https://github.com/LegitSoulja/OgarConsole/blob/master/cmd.html -->
</body>
</html>
