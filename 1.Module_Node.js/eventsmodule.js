//class is continor of propoty function we called method
//EventEmitter is a class 
//most class are in this module
const EventEmitter = require('events');
const emitter = new EventEmitter();
//register a listener 
//listener is function will call we event is raies
emitter.on('messageLogged',function(arg){//at arg we can use e or eventArg
    console.log('Listener called',arg);

});
//raise an event
//we can add additional argument in event it called event argument
//we create an object of arguments {id :1, url:'http://www.google.com'} 
emitter.emit('messageLogged',{id :1, url:'http://www.google.com'});

//Raise :logging (data:message)