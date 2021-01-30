//express give our app structure.
//we use 'let' for diffineing variable that we can change it.
//we use 'const' for constant variable which we cannot change it.
//we use below type of function to load middelware files
const Joi = require('joi');//we are useing it to definging the information about input information.
const logger = require('./logger');//calling logger.js file
const express =require('express');//we are calling express module.
const app = express();//we are defining it in express module in app.
const helmet = require('helmet');//Helmet helps you secure your Express apps by setting various HTTP headers.
const morgan = require('morgan');//HTTP request logger middleware for node.js
const config = require('config');//this module is good for development and production process because it give information about process
const debug = require('debug')('app:startup');//this module is good for debuging process it help to understand problem
const dbdebug = require('debug')('app:db');//this function is use for dd bugs
const home = require('./router/home');//we are calling this function with other location and this is it path


//we are calling function
app.use(home);




//Templating Engines
//It generat dynamic html and it return it to client or disply it
app.set('view engine', 'pug');//it internaly load the pug module in this app 
//this location where our templates are
app.set('views','./views');



app.use(express.json());//for enableing (req.body.name) beause express is not define it we have to define it sepretly
app.use(express.urlencoded());//middleware function
app.use(express.static('public'));//by using this we can have image ,css file ,html file etc.
app.use(helmet());

//Configuration
//we use this configration for display information in development.json or production.json
//this is depends upon NODE-ENV 
console.log('Application Name:' + config.get('name'));
console.log('Mail Server :'+ config.get('mail.host'));
console.log('Mail password:' + config.get('mail.password'));




//we are use this for displaing information where our app is which process devlopment or production 
if(app.get('env')==='development'){
    app.use(morgan('tiny'));//by using this we can see every requect client hase send to server
    //for debuging module we change it or we can use console.log() to dislpay it
    debug('Morgon enable..');//we use this to display it or stop displaing it

}

//database work 
//by using this method we can find where our error is occuring in dbdebug or debug variable
//for chainging debug messages 'set DEBIG=app.startup or app.db'
//for showing all message in debug ' set DEBUG = app:*'
dbdebug('Connecting database');




//for chaging it we have to give command 'set NODE_ENV=production' 




//'https://expressjs.com/en/resources/middleware.html' using this link we can have inforamtion and types of middelware 
app.use(logger);

app.use(function(req, res, next){
    console.log('Authenticating...');
    next();//if we don't use thos then our requst will be hagning 
});

const courses =[
    {id:1 , name:'course1'},
    {id:2 , name:'course2'},
    {id:3 , name:'course3'},
]





//'/api' by using this we are making subpages in it
app.get('/api',(req,res)=>{
    res.send(courses);
});

app.post('/api',(req,res) => {
    //we are using post method for creating objects in web app.
    //we creating schema beacuse we are giving inforation about input charater if that not satisfied then it will print 404. 
     const schema={
         name: Joi.string().min(3).required()
     };
     
     const result= Joi.validate(req.body, schema);
    
 
     if(result.error){
         //404 Bad Request
         res.status(400).send(result.error.details[0].message);
         return;
     }
    //we are creating a data beause we don't connected to database
     const course1 ={
     id: courses.length +1 ,
     name: req.body.name
    };  
    courses.push(course1);
    res.send(course1);
 }); 

app.put('/api/:id',(req,res)=>{
    // we use put for updating exiting information 
    //looking up the course
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course)res.status(404).send('The course with the given ID was not found');//404 is use for object not found in this api
    
    //validation
    const result = validateCourse(req.body);
    const {error} = validateCourse(req.body);
    if(result.error){
        //404 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    
    //update coures
    course.name = req.body.name;
    //Return the upeate coures
    res.send(course);

     
});

//creating function to validate coures
function validateCourse(course){
    const schema={
        name: Joi.string().min(3).required()
    };
  return Joi.validate(course, schema);
     
}

app.delete('/api/:id',(req , res)=>{
    //this is created for deleting object in web app.
    //look up coures
    //not exisiting , return 404
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course)res.status(404).send('The course with the given ID was not found');//404 is use for object not found in this api
    
    //delete
    const index = courses.indexOf(course);
    courses.splice(index,1);

    //return the same course
    res.send(course);
})


//'/api/:id' we are creating parameter of pages
//we use parseInt because (re.params.id) is giving string value and parseInt it convert into integer.
//find is method , '=>' is function will use to coures find crateria
//this is use to print boolean value.
//this is get method of http module to dislpay information on screen.
app.get('/api/:id', (req,res)=>{
    //this is created for finding specific objects in web app.
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course)res.status(404).send('The course with the given ID was not found');//404 is use for object not found in this api
    res.send(course);
});




//envoiment variable is part of envoiment which porcess work.
//to give envoiment port for apliction we use express PORT = 5000;
const port =process.env.PORT || 3000;
//app.listen is use for displaing app.get information on given port 
//we use console.log for dislpaing informtion about port in cmd
app.listen(port,()=>console.log(`Listening port ${port}...`));
  