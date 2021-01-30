const EventEmiter = require('events');

class Logger extends EventEmiter{
    log(message){
        //send HTTP request
        console.log(message);

        //Raise an event
        this.emit('messageLogged',{id :1 ,url:'http://'});
    }
}
module.exports = Logger;