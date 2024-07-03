const express = require('express');
const { CheckUser, Login, Logout, register, getUser, getGoogleuser } = require('../controllers/Auth.js');
const {IsUser} = require('../middleware/verifyToken.js');
const AuthRoutes=express.Router()

AuthRoutes.post('/register',register)
AuthRoutes.get('/getUser',getUser)
AuthRoutes.get('/getGoogleUser',getGoogleuser)
AuthRoutes.post('/login',Login)
AuthRoutes.post('/logout',Logout)
AuthRoutes.get('/CheckUser',IsUser,CheckUser)

module.exports =  AuthRoutes;