// use the path of your model 
const User = require('../models/register'); 
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
 
describe('User Registration Testing', () => { 
    // the code below is for insert testing  
    var id ='';   
    it('Add User', () => {         
        const user = {   
            'profile':'any.jpg',          
            'fullname': 'Rajib',
            'email':'rajibcrest7@gmail.com',
            'password':'123' ,        
            'phonenumber': '9860176787',
            'address':'KTM',
            'usertype':'user'         };                  
            return User.create(user)             
            .then((user_res) => {                 
                id = user_res._id;
                
            expect(user_res.fullname).toEqual('Rajib');
             });     
            }); 

            //Update User

            it('updateuser testing',() =>{
                const userupdate ={
                    fullname: 'Rajib Shrestha'
                }
                console.log(id)
                return User.findByIdAndUpdate(id, userupdate, { 
                    new: true
                }).then((userupdate) =>{
                    expect(userupdate.fullname).toEqual('Rajib Shrestha');
                });
            });

            // User Delete Testing
            it('testing User Delete', async() =>{
                const status = await
                User.deleteMany({ fullname: 'Rajib Shrestha'
                });
                expect(status.ok).toBe(1);
            });
            });