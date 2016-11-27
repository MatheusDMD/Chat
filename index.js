var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var user_id;
var users_online = [];
app.set('port', process.env.PORT || 3000);

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
  socket.on('get connected users', function(){
    io.emit('connected users', users_online);
  });
});

io.on('connection', function(socket){
  user_id = socket.id;
  users_online.unshift(user_id);
  console.log(user_id);
  socket.on('disconnect', function(){
    users_online.splice(users_online.indexOf(socket.id), 1);
    console.log('user disconnected');
  });
});

http.listen(app.get('port'), function(){
  console.log('listening on *:3000');
});
