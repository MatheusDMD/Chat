var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var user_id;

app.use("/styles", express.static(__dirname + '/styles'));
app.use("/js", express.static(__dirname + '/js'));

//Chat
app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('get info', function(){
    io.emit('get info', user_id);
  });
});

io.on('connection', function(socket){
  user_id = socket.id;
  console.log(user_id);
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
