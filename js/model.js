class Message {
  constructor(msg,usr,time,msg_id){
    this.msg = msg;
    this.usr = usr;
    this.time = time;
    this.usr_id = msg_id;
  }
  get message(){
    return this.msg;
  }
}

class User {
  constructor(name){
    this.name=name;
  }
}
