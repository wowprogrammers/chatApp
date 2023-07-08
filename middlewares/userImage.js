const multer = require('multer');
const path = require('path');

const multerStorage = multer.diskStorage({

    destination:(req,file,cb) =>{
        cb(null,path.join(__dirname,'../uploadFiles/Images')) //rename
    },

    filename:(req,file,cb) =>{ 

        cb(null,`user-${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req,file,cb) =>{
    const acceptedExt = ['.png','.jpg','.jpeg'];
    if(!acceptedExt.includes(path.extname(file.originalname))){
        return cb("This file is not acceptable....");
    }

    const fileSize = parseInt(req.headers['content-length']);
    if(fileSize > 5242880){ //1MB
        return cb("Your file Size  Cross the limit")

    }

    cb(null,true)
    

}

const upload = multer({
    storage:multerStorage,
    fileFilter:fileFilter,
    fileSize:10485766
})

module.exports = upload