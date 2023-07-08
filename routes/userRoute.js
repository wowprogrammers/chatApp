const express = require('express');
const userRoute = express();
const userController = require('./../controllers/userController');
const upload = require('./../middlewares/userImage')
const session = require('express-session')
const {sessionSecret} = process.env;
// Importing the authentication
const auth = require('../middlewares/authentication')

userRoute.use(session({secret:sessionSecret}))

// Registration page
userRoute.get('/',auth.isLogout,userController.registerPage)
 
// Registration Implementation (Route Level)
userRoute.post('/register',upload.single('userImage'),userController.register) 
// Load Login Page

userRoute.get("/login",auth.isLogout,userController.loadLoginPage)

// Login Implementation
  
userRoute.post('/login',userController.login)

// Loading the dashboard Page

userRoute.get('/dashboard',auth.isLogin,userController.loadDashBoardPage);

// Logout 
userRoute.get('/logout',auth.isLogin,userController.logout);

// save Chat route
userRoute.post('/save-chat',userController.saveChat)

// chat delete route
userRoute.delete('/delete-chat',userController.chatDelete);

// update chat route
userRoute.put("/update-chat",userController.updateChat)
module.exports = userRoute