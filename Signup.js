require('./connection/database');
const User = require('./models/register');
const multer = require('multer');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());

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
    console.log(token)
    res.json(user)
})

app.listen(3001);