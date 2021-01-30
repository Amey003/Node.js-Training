//by useing this module we are getting information about files in folder 
const fs = require('fs');

const file = fs.readdirSync('./');
console.log(file);
//there is two type of readdir and readdirSync
//readdirSync is open only one backdoor there for asyncronices files are best
//readdir is use for lage number of data set 

fs.readdir('./',function(err , files){
    if(err) console.log('Error',err);
    else console.log('Result',files);

})