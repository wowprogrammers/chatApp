const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/chatAppDb',{
}).then(()=>{
    console.log("DataBase Connected Successfully... ")
}).catch((error)=>{
    console.log("Unable to connect database ,",error)
})          