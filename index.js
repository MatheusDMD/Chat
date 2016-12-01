var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var user_id;
var users_online = [];
var user_chats = {};
app.set('port', process.env.PORT || 3000);

app.use("/styles", express.static(__dirname + '/styles'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/images", express.static(__dirname + '/images'));
//Chat
app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket){
  socket.on('user message', function(msg){
    if(user_chats[msg.usr_id][1] == 0){
      user_chats[msg.usr_id][0] = msg.usr;
      user_chats[msg.usr_id].pop();
    user_chats[user_id].push(msg.usr + ": " + msg.msg);
    io.emit('user message back', msg);
    io.emit('chat', user_chats[msg.usr_id]);
  });
  socket.on('get connected users', function(){
    io.emit('connected users', users_online);
  });
  socket.on('get chat', function(id){
    io.emit('chat', user_chats[id]);
  });
  socket.on('admin message', function(adminMessage){
    var result = adminMessage.split("///");
    user_chats[result[3]].push(result[1] + ": " + result[0]);
    io.emit('chat', user_chats[result[3]]);
    io.emit('admin message recieved', result);
  });
});

io.on('connection', function(socket){
  user_id = socket.id;
  user_chats[user_id] = [user_id,0];
  users_online.push(user_id);
  console.log(users_online);
  io.emit('connection stablished', user_id);
  io.emit('connected users', users_online);

  socket.on('disconnect', function(){
    users_online.splice(users_online.indexOf(socket.id), 1);
    io.emit('connected users', users_online);
    console.log('user disconnected');
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on 3000');
});
