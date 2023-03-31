console.log("Welcome coder dost family!!!")

// Importing all Packages 
const express = require("express");
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
const userSpace = io.of('/userNameSpace');

// Configure env file
require("dotenv").config();
// Importing Conn file of db
require('./db/conn')

// serving the static files (Important!!!!)
app.use(express.static("./public"));
app.use(express.static("./uploadFiles"))


// Configure template engine "ejs"
app.set('view engine',"ejs");
app.set('views','./views') 

// Configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
 
// Importing "Custom Modules"
const userRoute = require('./routes/userRoute');

app.use('/',userRoute)


const User = require('./models/userModel');
// Sockets Configuration
userSpace.on('connection', async function(socketId){
    console.log("User is online");
    let userId = socketId.handshake.auth.token;
    await User.findByIdAndUpdate({_id:userId},{$set : {is_Online : 1}});
    // Broadcasting status of "online" users
    socketId.broadcast.emit('getOnlineUsers', {userId})

    socketId.on('disconnect',async function(){
        console.log("User is offline")
        let userId = socketId.handshake.auth.token;
        await User.findByIdAndUpdate({_id:userId},{$set : {is_Online : 0}});
        // Broadcasting status of "offline" users
        socketId.broadcast.emit('getOfflineUsers',{userId})
    })

    // Chat implementation
    // Event listen
    socketId.on('newChat',(data)=>{
        socketId.broadcast.emit('loadNewChat',data); //New Event Fire(broadcast)
    })

})










// Creating Server
const port = process.env.PORT || 8000
http.listen(port, ()=>{
    console.log(`Server is started on port ${port} ....`)
})