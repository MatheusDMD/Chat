var socket = io();
var my_id;
var msg =null;
$('form').submit(function(){
  socket.emit('get info');
  var sent_time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
  msg = new Message($('#m').val(),$('#n').val(),sent_time, null);
  $('#m').val('');
  //socket.emit('chat message', $('#m').val());
  //$('#m').val('');
  return false;
});
socket.on('get info', function(current_id){
  if($('#n').val() == msg.usr){
  msg.usr_id = current_id;
  $('#m').val('');
  my_id = current_id;
  console.log(my_id)
  socket.emit('chat message', msg);
  }
});
socket.on('chat message', function(message){
  //var sent_time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
  //var message = new Message(msg,$('#n').val(),sent_time);
  if(msg !== null){
  console.log(message.usr);
  if($('#n').val() == message.usr){
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
  else{
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
  }
  $('#messages').append($(html_message));
  msg = null;
  }
});
