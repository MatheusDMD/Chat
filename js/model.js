class Message {
  constructor(msg,usr,time,msg_id,source){
    this.msg = msg;
    this.usr = usr;
    this.time = time;
    this.usr_id = msg_id;
  }
  get sendToJava(){
    var text = this.usr + ": " + this.msg;
    return text;
  }
}
