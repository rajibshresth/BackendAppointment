const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    profile:{
        type:String
    },
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
//checking email and password 
userSchema.statics.checkCrediantialsDb = async(mail, pswd) => {
    const user1 = await User.findOne({ email: mail, password: pswd })
    return user1;
}

//token generating part
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    console.log(token);
    user.tokens = user.tokens.concat({ token: token })
    await user.save()
    return token;
}




const User = mongoose.model('User', userSchema);
module.exports = User;