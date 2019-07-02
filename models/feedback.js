const mongoose = require('mongoose');
const contact = mongoose.model("contact",{
    name: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    },
})
module.exports = contact;