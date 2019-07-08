// use the path of your model 
const Booking = require('../models/appointment'); 
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
 
describe('Appointment Booking Testing', () => { 
    // the code below is for insert testing  
    var id ='';   
    it('Add Appointment', () => {         
        const booking = {         
            'fullname': 'Rajib Shrestha',
            'date':'2019-07-10',
            'time':'11:00' ,        
            'phonenumber': '9860176787',
            'admins':'Admin',
            'address':'anywhere'         };                  
            return Booking.create(booking)             
            .then((booking_res) => {                 
                id = booking_res._id;
                
            expect(booking_res.fullname).toEqual('Rajib Shrestha');
             });     
            }); 


            // Booking Delete Testing
            it('testing Booking Delete', async() =>{
                const status = await
                Booking.deleteMany({ fullname: 'Rajib Shrestha'
                });
                expect(status.ok).toBe(1);
            });
            });