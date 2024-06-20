const express = require('express');
const app = express();
const {DBConnection} = require('./database/db.js');
const User = require('./models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

DBConnection();

app.get('/', (req,res) => {
    res.send('Welcome');
});

app.post('/register', async (req,res) => {
    console.log(req);
    try{
        //get all the data from request body
        const {firstname,lastname, email, password} = req.body;

        //check that all data should exist
        if(!firstname && lastname && email && password){
            return res.status(400).send('Please enter all the required fields!');
        }

        //check if user already exists
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).send('User already exist!');
        }

        //encrypt the password
        const hashPassword = bcrypt.hashSync(password,10);
        console.log(hashPassword);

        //save the user to the database
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword, 
        });

        //generate a token for the user and send it
        const token = jwt.sign({id:user._id, email}, process.env.SECRET_KEY,{
            expiresIn: "1h"
        }); 
        user.token = token;
        user.password = undefined;
        res.status(201).json({
            message: "You have successfully refistered",
            user
        });

    }
    catch(error){
        console.log(error);
    }
});

app.post('/login', async (req,res) => {
    try{
        //get all data from req body
        const {email,password} = req.body;

        //check that all the data should exist
        if(!email && password){
            return res.status(400).send('Please enter all the required fields!');
        }

        //check if user is registered
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not found!");
        }

        //match password
        const enteredPassword = await bcrypt.compare(password, user.password);
        if (!enteredPassword) {
            return res.status(401).send("Password is incorrect");
        }

        //create token
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        user.token = token;
        user.password = undefined

        //store cookies
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true, //only manipulate by server not by client/user
        };

        //send the token
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token,
        }); 
    }
    catch(error){
        console.log(error.message);
    }
});


app.listen(8000, ()=> {
    console.log("Server is listening on port 8000");
});