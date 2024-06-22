const User = require("../models/User");
const bcrypt = require("bcrypt");

async function createAdminAccount(){
    try{
        const existingAdmin = await User.findOne({ email: "admin@test.com"});
        if(!existingAdmin){
            const newAdmin = new User({
                firstname: "admin",
                lastname: "admin",
                email: "admin@test.com",
                password: bcrypt.hash("admin",10)
            });
            await newAdmin.save();
            console.log("Admin Created Successfully");
        }      
        else{
            console.log("Admin account already exist");
        }

    }
    catch(error){
    console.log(error.message);
    };
};

module.exports = { createAdminAccount };