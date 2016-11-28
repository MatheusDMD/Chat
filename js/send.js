var socket = io();
var isConnected = false;
var my_id;
$('form').submit(function(){
  var sent_time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
  msg = new Message($('#m').val(),$('#n').val(),sent_time, my_id);
  $('#m').val('');
  socket.emit('user message', msg);
  //socket.emit('chat message', $('#m').val());
  //$('#m').val('');
  return false;
});
socket.on('user message back', function(message){
  if(message.usr == $('#n').val()){
    var html_message = '<li class="mar-btm">\
      <div class="media-right">\
        <img src="http://bootdey.com/img/Content/avatar/avatar2.png" class="img-circle img-sm" alt="Profile Picture">\
      </div>\
      <div class="media-body pad-hor speech-right">\
        <div class="speech">\
          <a href="#" class="media-heading">'+message.usr+'</a>\
          <p>'+message.msg+'</p>\
          <p class="speech-time">\
            <i class="fa fa-clock-o fa-fw"></i> '+message.time+'\
          </p>\
        </div>\
      </div>\
    </li>';
  }
  $('#messages').append($(html_message));
});
socket.on('admin message recieved', function(result){
    message = new Message(result[0],result[1],result[2],result[3]);
    if(message.usr_id == my_id){
    var html_message ='<li class="mar-btm">\
      <div class="media-left"> \
        <img src="http://bootdey.com/img/Content/avatar/avatar1.png" class="img-circle img-sm" alt="Profile Picture">\
      </div>\
      <div class="media-body pad-hor">\
        <div class="speech">\
          <a href="#" class="media-heading">'+ message.usr +'</a>\
          <p> '+ message.msg +' </p> \
          <p class="speech-time">\
            <i class="fa fa-clock-o fa-fw"></i> '+ message.time +'\
          </p>\
        </div>\
      </div>\
      </li> ';
  $('#messages').append($(html_message));
  }
});
socket.on('connection stablished', function(id){
  if(!isConnected){
    my_id = id;
    isConnected = true;
    console.log(my_id)
  }
});
