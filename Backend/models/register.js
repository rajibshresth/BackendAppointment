const mongoose = require('mongoose');
const Signup = mongoose.model('user', {
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phonenumber: {
        type: String
    },
    address: {
        type: String
    },
    

});

module.exports = Signup;