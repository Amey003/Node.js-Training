const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/example')
    .then(()=>console.log('connected to mongoDB'))
    .catch(err => console.log('could not connect to mongodb',err))


const courseSchema = new mongoose.Schema({
        name:String,
        author:String,
        tags:[String],
        date:Date,
        isPublished:Boolean,
        price:Number
});
const Course = mongoose.model('Course',courseSchema);

async function getCourses(){
    return await Course.find();
}

async function run(){
    const courses = await getCourses();
    console.log(courses);
}
run();