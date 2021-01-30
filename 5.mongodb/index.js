const mongoose=require('mongoose');
//connect to mongodb
//refrances to we connected to mongodb
//playground is database
mongoose.connect('mongodb://localhost/playground')
    .then(()=>console.log('connected to mongoDB'))//we use this to diplay coonection when mond=gobd is connected by promise method
    .catch(err => console.log('could not connect to mongodb',err))
//we created schema schema is use for structure of database
const courseSchema = new mongoose.Schema({
    name:String,
    author:String,
    tags:[String],
    date : Date,
    isPublished:Boolean
});


//we create asyuncronise function here
//'Course' is a class that why C is capital
//'course' is object here
async function creatingCourse(){
const Course = mongoose.model('Course',courseSchema);
const course = new Course({
    name:'angular course',
    author:'amey',
    tags:['agular','frountend'],
    isPublished:true
});
//'course.save()' is use for saving the information
const result = await course.save(); 
console.log(result);
}
creatingCourse();//calling function

async function getCourses(){
    const pageNumber = 2;
    const pageSize =10;
    //compareson oprator
    //eq (equal),ne(not equal),,gt(greater than),get(greater than or equal to),lt(less than),lte(less than and equal to),in,nin(not in)
    //logical opreator
    //or,and
    //regular expression
    const Course = mongoose.model('Course',courseSchema);
    const courses = await Course
    //.find({price:{$gte:10,$lte:20}})
    //.find([price:{$in:[10,15,20]}])
    .find({author:'amey'})
    //.or([{author:'amey'},{isPublished:true}])
    //.find({author:/^amey/}) '^' is use for finding information with statring name
    //.find({aurtor:/patil$/i})'$'is use for finding inforation end with patil 
    //.find({aurtor:/*amey*/i})'*' is use for finding information in middel part
    .limit(10)  
    .sort({name:1})
    .select({name:1,tag:1});//we are solting this or we can say that we giving monodb commands
    //.count() is use for counting document is database
    console.log(courses);//this is use for printing the document in mongodb
}
getCourses();
//this is use for updating value in database
async function updateCourse(id){
    const Course = mongoose.model('Course',courseSchema);
    const course =await Course.findById(id);
    if(!course) return;
    course.isPublished=true;
    course.author='Another Author';

    const result = await course.save();
    console.log(result);

}
updateCourse('5f394ca4a790793944a766dc');