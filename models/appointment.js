const mongoose = require('mongoose');
const bookappointment = mongoose.model("bookappointment",{
    fullname: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    phonenumber: {
        type: String
    },
    admins: {
        type: String
    },
    address: {
        type:String
    },
})
module.exports = bookappointment;