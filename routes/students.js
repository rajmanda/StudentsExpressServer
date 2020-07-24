const express = require('express');
const router = express.Router();
const fs = require('fs');



//Set up mongoose connection
const mongoose = require('mongoose');
//const mongoDB = process.env.DB_CONN_STRING;
const mongoDB = 'mongodb://sritechllc:Sushma123@ds149353.mlab.com:49353/db4videoplayer';
const Student = require('../models/student');

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, function(err){
    if(err){
        console.error('MongoDB connection error:' + err);
    }
});


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// get all students
router.get('/', function(req, res){
    console.log('Get request for all students');
    Student.find({})
    .exec(function(err, students){
        if (err){
            console.log("Error retrieving students");
        }else {
            res.json(students);
        }
    });
});

//get student by id
router.get('/:id', function(req, res){
    console.log('Get request for a single student');
    Student.findById(req.params.id)
    .exec(function(err, student){
        if (err){
            console.log("Error retrieving student");
        }else {
            res.json(student);
        }
    });
});

//add student
router.post('/', function (req, res) {
    console.log('Post a student', req.body);
    var newStudent = new Student();
    newStudent.name = req.body.name;
    newStudent.school = req.body.school;
    newStudent.achievement = req.body.achievement;
    newStudent.password = req.body.password;
    newStudent.image = req.body.image;

    newStudent.save(function(err, insertedStudent){
        if (err){
            console.log('Error saving student');
        }else{
            res.json(insertedStudent);
        }
    });
 
});

router.put('/:id', function(req, res){
    console.log('Update a student');
    Student.findByIdAndUpdate(req.params.id,
    {
        $set: {name: req.body.name, url: req.body.school, achievement: req.body.achievement}
    },
    {
        new: true
    },
    function(err, updatedStudent){
        if(err){
            res.send("Error updating student");
        }else{
            res.json(updatedStudent);
        }
    }

    );
});

router.delete('/:id', function(req, res){
    console.log('Deleting a student');
    Student.findByIdAndRemove(req.params.id, function(err, deletedStudent){
        if(err){
            res.send("Error deleting student");
        }else{
            res.json(deletedStudent);
        }
    });
});



const multer = require('multer') ;
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        error = null ;
        //cb(error, './uploads') ;
        cb(error, './public/images') ;
    },
    filename: function(req, file, cb){
        console.log("file. originalname", file.originalname)
        error = null ;
        //cb(error, new Date().toISOString() + file.originalname) ; 
        cb(error, file.originalname) ; 
    }
}) ;
//Filter filetypes. Restrict only Jpeg and png files
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true) ;
    }else{
        cb(new Error('FileType Not Suuported - only Jpeg & PNG files are supported.'), false) ;
    }
}
const upload = multer({storage: storage, 
                       limits:{fileSize:1024 * 1024 * 10},
                       fileFilter: fileFilter
                       }) ;


/*make sure the name of the field is 'image' and the type is 'file' for the image that is coming in
  - student-form.component.html
  <input [(ngModel)]="model.image" type="file" class="form-control" name="image" id="image" required> 
*/
router.post('/image', upload.single('image'), function(req, res){
    
    var imagepath =  req.file.path.toString().substring(7, req.file.path.toString().length);
    console.log('Post a Student Profile------' + imagepath);
    
    // - Start to read the content of the file so it can be saved to db
    var img = fs.readFileSync(req.file.path) ;
    var econdedImg = img.toString('base64') ;
    // - End to read the content of the file so it can be saved to db
    
    var newStudent = new Student();
    newStudent.name = req.body.name;
    newStudent.school = req.body.school;
    newStudent.achievement = req.body.achievement;
    newStudent.password = req.body.password;
    newStudent.image = 'http://localhost:3000/'+imagepath ;
    //newStudent.image = 'http://'+process.env.LOCALHOST+':3000/'+req.file.path ;
    newStudent.imgPath = 'http://localhost:3000/'+imagepath ;
    newStudent.imgContentType = req.file.mimeType;
    /*
     donot write to mlab mongodb as it will take for ever to fetch the records
    */
    //newStudent.imgBinary = new Buffer(econdedImg, 'base64') ;
    
    newStudent.save(function(err, insertedStudent){
        if (err){
            console.log('Error saving student');
        }else{
            res.json(insertedStudent);
        }
    });
})


module.exports = router