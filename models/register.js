const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
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
    usertype: {
        type:String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

//token generating part
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisisloginuser')

    console.log(token);
    user.tokens = user.tokens.concat({ token: token })
    await user.save()
    return token;
}

//checking email and password 
userSchema.statics.checkCrediantialsDb = async(email, password) => {
    const user1 = await User.findOne({ email: email, password: password })
    return user1;
}


const User = mongoose.model('User', userSchema);
module.exports = User;