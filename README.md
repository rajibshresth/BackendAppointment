# Office Appointment Booking System
Name: Rajib Shrestha

CollegeID: 160442

Batch: Jan19C

Brief description of the domain of your project!

## List of Main Features
User can update profile.
User can book Appointment.
Admin can add employees.
Admin can delete users, feedbacks and appointments.

## API Documentation

  "dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "jest": "^24.8.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.6.0",
    "multer": "^1.4.1",
    "nodemon": "^1.19.1",
    "path": "^0.12.7"
  }
  
## API Routes

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
    



