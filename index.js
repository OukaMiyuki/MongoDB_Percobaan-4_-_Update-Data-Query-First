const mongoose = require('mongoose');

//database connection
const mongoDB = 'mongodb://localhost/playground';
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB Server : ', err));

//Create database schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
}); 

const Course = mongoose.model('Course', courseSchema); //if you wondering how can you get the name of the table check in this line

async function createCourse(){
    try{
        const course = new Course({
            name: 'Angular Course',
            author: 'Ouka Miyuki',
            tags: ['Angular', 'frontend'],
            isPublished: true
        });
    
        const result = await course.save();
        console.log(result);
    } catch(err){
        console.log('There\'s an error : ', err.message);
    }
}

//Update data using query first approach
async function updateData(id){
    const course =  await Course.findById(id);
    if(!course) return; //if id is not found then return null

    //Method 1
    course.isPublished = true;
    course.author = 'Another Author';
    
    //Method 2
    // course.set({
    //     isPublished: true;,
    //     author: 'Another Author';
    // });

    const result = await course.save();
    console.log(result);
}

//you can use another property to update the data, but don't forget to set unique constraint to the updated property
//Check here https://stackoverflow.com/questions/47064163/mongodb-mongoose-make-emailid-unique-field
//also here https://docs.mongodb.com/manual/tutorial/unique-constraints-on-arbitrary-fields/
updateData('5f1494859077cd33884ba3e1');