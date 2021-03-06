var socket = io();
var isConnected = false;
var my_id;
$('form').submit(function(){
  if($('#m').val() !== ''){
    var sent_time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
    msg = new Message($('#m').val(),$('#n').val(),sent_time, my_id);
    $('#m').val('');
    socket.emit('user message', msg);
  }
  return false;
});

socket.on('user message back', function(message){
  if(message.usr == $('#n').val()){
    var html_message = document.createElement('li');
    html_message.className = "mar-btm";
    html_message.innerHTML = '<div class="media-right">\
        <img src="https://myspace.com/common/images/user.png" class="img-circle img-sm" alt="Profile Picture">\
      </div>\
      <div class="media-body pad-hor speech-right">\
        <div class="speech">\
          <a href="#" class="media-heading">'+message.usr+'</a>\
          <p>'+message.msg+'</p>\
          <p class="speech-time">\
            <i class="fa fa-clock-o fa-fw"></i> '+message.time+'\
          </p>\
        </div>\
      </div>';
  }
  $('#messages').append($(html_message));
  document.getElementById('messages-div').scrollTop = html_message.offsetHeight + html_message.offsetTop;
});

socket.on('admin message recieved', function(result){
    message = new Message(result[0],result[1],result[2],result[3]);
    if(message.usr_id == my_id){

    var html_message = document.createElement('li');
    html_message.className = "mar-btm";
    html_message.innerHTML = '<div class="media-left"> \
        <img src="https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-9/13770366_1400216826672226_4160059843424842997_n.jpg?oh=f7abb746ec3469223e44f1191e9c459f&oe=58B9840F" class="img-circle img-sm" alt="Profile Picture">\
      </div>\
      <div class="media-body pad-hor">\
        <div class="speech">\
          <a href="#" class="media-heading">'+ message.usr +'</a>\
          <p> '+ message.msg +' </p> \
          <p class="speech-time">\
            <i class="fa fa-clock-o fa-fw"></i> '+ message.time +'\
          </p>\
        </div>\
      </div>';
  $('#messages').append($(html_message));
  document.getElementById('messages-div').scrollTop = html_message.offsetHeight + html_message.offsetTop;
  }
});
socket.on('connection stablished', function(id){
  if(!isConnected){
    my_id = id;
    isConnected = true;
    console.log(my_id)
  }
});
