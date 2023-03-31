
const isLogin = async(req,res,next) =>{
    try{
        if(req.session.user){ //userIsLogin
            next()
        }else{ //notLogin
            res.redirect('/login')
        }

    }catch(error){

    }
} 
 

const isLogout = async(req,res,next) =>{
    try{
        if(req.session.user){ //userIsLogin
            res.redirect('/dashboard')
        }else{ //userIsLogout
            next()

        }

    }catch(error){

    }
}

module.exports = {isLogin,isLogout}