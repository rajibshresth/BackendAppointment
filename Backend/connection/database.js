var mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/appoint';
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

connect.then((db) => {
    console.log("Connection successfull" + db);
}, (err) => {
    console.log(err);
});