//by useing this module we can create our owne web page
//in this we are using 3000 port to run hello world commnad
const http = require('http');
const server = http.createServer((req , res)=>{
    if (req.url =='/'){
        res.write('Hello Wrold');
        res.end();
    }
    if(req.url == '/api'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
        }
});


server.listen(3000);

console.log('Listening on port 3000...')
 