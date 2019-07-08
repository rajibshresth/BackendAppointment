// use the path of your model 
const Info = require('../models/feedback'); 
const mongoose = require('mongoose'); 
// use the new name of the database 
const url = 'mongodb://localhost:27017/testing';  
beforeAll(async () => {     await mongoose.connect(url, {
             useNewUrlParser: true,         
             useCreateIndex: true     
            }); 
        }); 
 
afterAll(async () => { 
 
    await mongoose.connection.close(); }); 
 
describe(' Contact Page Testing', () => { 
    // the code below is for insert testing  
    var id ='';   
    it('Give Feedback', () => {         
        const info = {         
            'fullname': 'Rajib Shrestha',       
            'email': 'rajibcrest7@gmail.com',
            'message':'Please add some vibrant colors to the webpage'         };                  
            return Info.create(info)
            .then((info_res) => {                 
                id = info_res._id;
                
            expect(info_res.email).toEqual('rajibcrest7@gmail.com');
             });     
            }); 


            // Feedback Delete Testing
            it('testing Feedback Delete', async() =>{
                const status = await
                Info.deleteMany({ email: 'rajibcrest7@gmail.com'
                });
                expect(status.ok).toBe(1);
            });
            });