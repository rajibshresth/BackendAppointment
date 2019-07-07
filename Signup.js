require('./connection/database');
const User = require('./models/register');
const multer = require('multer');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const auth = require('./middleware/auth');
const app = express();
const bookappointment = require ('./models/appointment')
const contact = require ('./models/feedback')

app.use('/profile', express.static('./public/uploads'))
app.use(cors());

var storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, 'ProfileImage' + Date.now() + ext);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 1000000 }
});

    app.post("/uploadImage",upload.single('imageFile'), (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    });

app.use(bodyParser.urlencoded({ extended: false }));
app.post("/Signup", (req, res) => {
    var myData = new User(req.body);
    myData.save().then(function() {
        res.send('User registered successfully');

    }).catch(function(e) {
        res.send(e)
    });
});

app.post("/login", async function(req, res) {
    const user = await User.checkCrediantialsDb(req.body.email, req.body.password);

    const token = await user.generateAuthToken();
    console.log(token);
    // user['token']=token;
    res.json(user);
});
app.get('/users/me', auth, function(req, res){
    res.send(req.user);
});

app.put('/updateprofile', auth, function(req, res){
    console.log(req.body);
    User.findByIdAndUpdate(req.user._id, req.body, {new : true}, (err, user) =>{
        res.send("Update Successful");
    });
});

app.get('/getemployee', function(req,res){
    User.find().then(function(register){
        res.send(register);
    })
    .catch(function(e){res.send(e)})
})
app.delete('/deleteemployee/:id', function(req,res){
    User.findByIdAndDelete(req.params.id).then(function(){
    }).catch(function(){
    })
    });

    app.post("/appointment", function(req,res){
        var data = new bookappointment(req.body);
        data.save().then(function(){
           res.send('Table Added Successfully');
        }).catch(function(e){
           res.send(e)
        });
    })

   app.get('/showappointment', function(req,res){
    bookappointment.find().then(function(appointment){
    res.send(appointment);
       })
   .catch(function(e){res.send(e)})
        })

    app.delete('/deleteappointment/:id', function(req,res){
            bookappointment.findByIdAndDelete(req.params.id).then(function(){
            }).catch(function(){
            })
            });

    app.post('/feedback', function(req,res){
                var send = new contact(req.body);
                send.save().then(function(){
                   res.send('Table Added Successfully');
                }).catch(function(e){
                   res.send(e)
                });
            })
    app.get('/showfeedback', function(req,res){
                contact.find().then(function(feedback){
                res.send(feedback);
                   })
               .catch(function(e){res.send(e)})
                    })
            
    app.delete('/deletefeedback/:id', function(req,res){
        contact.findByIdAndDelete(req.params.id).then(function(){
        }).catch(function(){
        })
        });



app.listen(3001);