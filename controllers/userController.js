// User Model
const User = require('../models/userModel');
// Chat Model
const Chat = require('../models/chatModel')
const bcrypt = require('bcrypt');

// Loading the registeration page

const registerPage = async(req,res) =>{
    try {
        res.render('signUp')
    } catch (error) {
        res.status(400).json({Error:error.message})
    }
}

// Registration "Implementation" (Controller Level)
const register = async(req,res)=>{
    try {
        const {username,email,password} = req.body;
        const image = req.file.filename;
        const hashPassword = await bcrypt.hash(password,12); //return a promise
        const user = new User({
            username,
            email,
            password:hashPassword,
            userImage:image, 
        })
        const savedUser = await user.save(); 
        if(savedUser){
            res.render('login' ,{
                message:"You Are registerd Successfully"
            })
        } 
        

    } catch (error) {
        res.status(400).json({Error:error.message})
    }

}

const loadLoginPage = async(req,res) =>{
    try {
            res.render("login")
    } catch (error) {
        res.status(400).json({Error:error.message})
        
    }
}

const login = async(req,res) =>{
    try{

        const {email,password} = req.body;
        let userData = await User.findOne({email});
        if(userData){
            const passwordMatch = await bcrypt.compare(password,userData.password);
            if(passwordMatch){
                req.session.user = userData;
                res.redirect('/dashboard')
            }else{
                res.render('login', {message:"Invalid email or password"})
            } 
        }else{
            res.render('login', {message:"Invalid email or password"})
        }

    }catch (error){

    }
}

const loadDashBoardPage = async(req,res) =>{
    try{
        const allUsers = await User.find({_id : {$nin:[req.session.user._id]}})
        res.render('dashboard' , {user:req.session.user,allUsers})
        
    }catch{
        res.status(400).json({Error:error.message})
    }
}

const logout = async(req,res) =>{
    try{
        req.session.destroy();
        res.redirect('/login')

    }catch(error){
        res.status(400).json({Error:error.message})
    }
}

const saveChat = async(req,res) =>{

    try {
        const {senderId,receiverId,message} = req.body;
        let chat = new Chat({
            senderId,
            receiverId,
            message
        })
        let newChat = await chat.save();
      res.status(200).json({success:true,message:"Chat is saved Successfully",data:newChat});
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}

const chatDelete = async(req,res)=>{
    try {
        const {msgId} = req.body;

        let deletedChat = await Chat.findByIdAndDelete(msgId);
        if(deletedChat){
            res.status(200).json({success:true})
        }
        
        
    } catch (error) {
        res.status(400).json({success:false,Error:error.message})
    }
}

const updateChat = async(req,res)=>{
    try {
        const {msgId,message} = req.body;
       let result = await Chat.findByIdAndUpdate(msgId,{
            $set:{
                message
            }
        })
        if(result){
            res.status(200).json({success:true})
        }
        
    } catch (error) {
        res.status(400).json({success:false})
    }

}

module.exports = {
    registerPage,
    register,
    loadLoginPage,
    login,
    loadDashBoardPage,
    logout,
    saveChat,
    chatDelete,
    updateChat
}