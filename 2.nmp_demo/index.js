//IT IS INPROVE VERSION OF C:\Users\Delta\Desktop\Node.js\Express\index.js
//IT CONTAIN WITH JOI 17.2.0 PACKAGE
//express give our app structure.
//we use 'let' for diffineing variable that we can change it.
//we use 'const' for constant variable which we cannot change it.
const Joi = require('joi');//we are useing it to definging the information about input information.
const express =require('express');//we are calling express module.
const app = express();//we are defining it in express module in app.



app.use(express.json());//for enableing (req.body.name) beause express is not define it we have to define it sepretly

const courses =[
    {id:1 , name:'course1'},
    {id:2 , name:'course2'},
    {id:3 , name:'course3'},
]

//app.get is use for displaing information in web page
//we use '/' for main home pages 
//(req , res) are rount handler
app.get('/',(req , res)=>{
    res.send('Hello World');
});
//'/api' by using this we are making subpages in it
app.get('/api',(req,res)=>{
    res.send(courses);
});

app.post('/api',(req,res) => {
    //we creating schema beacuse we are giving inforation about input charater if that not satisfied then it will print 404. 
     const schema={
         name: Joi.string().min(3).required()
     };
     
     const result= Joi.valid(req.body, schema);
    
 
     if(result.ValidationError){
         //404 Bad Request
         res.status(400).send(result.ValidationError);
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
    if(result.ValidationError){
        //404 Bad Request
        res.status(400).send(result.ValidationError);
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
  return Joi.valid(course, schema);
     
}









//'/api/:id' we are creating parameter of pages
//we use parseInt because (re.params.id) is giving string value and parseInt it convert into integer.
//find is method , '=>' is function will use to coures find crateria
//this is use to print boolean value.
//this is get method of http module to dislpay information on screen.
app.get('/api/:id', (req,res)=>{
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
  