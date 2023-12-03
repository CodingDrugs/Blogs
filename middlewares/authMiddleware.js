const jwt = require('jsonwebtoken')

const verifyToken = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt
        if(!token){
            res.redirect('/app/v1/user/signup')
        }
        const decodedToken = await jwt.verify(token,process.env.SECRET_STRING)
        if(!decodedToken){
            res.redirect('/app/v1/user/signup')
        }
        next()
    }catch(error){
        res.redirect('/app/v1/user/signup')
    }
}

module.exports = verifyToken