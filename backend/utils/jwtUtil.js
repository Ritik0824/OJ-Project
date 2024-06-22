const jwt = require('jsonwebtoken');
const SECRET_KEY = require("../index");

function generateRefreshToken(user){
    return jwt.sign({id: user._id}, process.env.SECRET_KEY,{
        expiresIn: '7h',
    });
}

function verifyToken(token){
    return jwt.verify(token, process.env.SECRET_KEY);
}

module.exports = { generateRefreshToken, verifyToken };