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

async function updateCourse(id){
    const Course = mongoose.model('Course',courseSchema);
    const result =await Course.update({_id:id},{
        $set:{
            author:'amey',
            isPublished:false
        }
    });
    console.log(result);

}
updateCourse('5f394ca4a790793944a766dc');

async function removeCourse(id){
const Course = mongoose.model('Course',courseSchema);
  const result =  Course.deleteOne({_id:id});
  console.log(result);
}
removeCourse('5f394d9ba7f71a1c1c776e21');