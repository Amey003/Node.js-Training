//in this we use => function for removing function in arg

const EventEmitter = require('events');

const Logger = require('./logger2');
const logger = new  Logger();

//Register a listener
logger.on('messageLogged', (arg)=>{
    console.log('Listener called',arg);
});
logger.log('message');