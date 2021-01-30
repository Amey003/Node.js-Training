//by using this we will get os information
const os = require('os');

var total = os.totalmem();
var free = os.freemem();
console.log('Total Memory:' + os.totalmem);
console.log(`Total memory:${os.totalmem}`);
console.log(`Free memory:${os.freemem}`);
