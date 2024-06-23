const express = require('express');
const helmet = require('helmet'); 
const app = express();
const { DBConnection } = require('./database/db.js');
const User = require('./models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { createAdminAccount } = require("./scripts/admin.js");
const { generateRefreshToken, verifyToken } = require("./utils/jwtUtil.js");
const problemRoutes = require('./routes/problem.js');

dotenv.config();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', problemRoutes);

// Set security headers manually if needed
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});

// Initialize database and admin account
DBConnection();
createAdminAccount();

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return res.status(400).send('Please enter all the required fields!');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists!');
        }

        const hashPassword = bcrypt.hashSync(password, 10);
        console.log(hashPassword);

        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
        });

        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });
        user.token = token;
        user.password = undefined;

        res.status(201).json({
            message: "You have successfully registered",
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Please enter all the required fields!');
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not found!");
        }

        const enteredPassword = await bcrypt.compare(password, user.password);
        if (!enteredPassword) {
            return res.status(401).send("Password is incorrect");
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });
        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/refresh-token', async (req, res) => {
    try {
        const { oldToken } = req.body;
        const decodedToken = verifyToken(oldToken);

        if (!decodedToken) {
            return res.status(400).send('Invalid token!');
        }

        const exisuser = await User.findById(decodedToken.id);
        if (!exisuser) {
            return res.status(401).send("User not found!");
        }

        const newToken = generateRefreshToken(exisuser);
        res.status(200).json({ message: "Refresh token created successfully", token: newToken, user: exisuser });
    }    
    catch (error) {
        console.log(error.message);
        res.status(401).json({ message: "Invalid token" });
    }
});

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
