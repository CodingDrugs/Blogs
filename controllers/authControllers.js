const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') // to create token

const genToken = async(id)=>{
    return await jwt.sign({id:id},process.env.SECRET_STRING,{
        expiresIn: 24*60*60*1000
    })
}

const getSignup=(req,res)=>{
    try{
        res.status(200).render("signup")
    }catch{
        res.status(400).json({message:error.message})
    }
}
const getLogin=(req,res)=>{
    try{
        res.status(200).render("login")
    }catch{
        res.status(400).json({message:error.message})
    }
}

const signUp = async (req,res)=>{ 
    try{
        //duplicate user email validation with custom error message
        const existingUser =await User.findOne({email:req.body.email})
        if(existingUser){
            return res.status(400).json({
                "status":"fail",
                "message":"user is already present with this mail id"
            })
        }

        const newUser = await User.create(req.body)
        const token = await genToken(newUser._id)
        res.cookie('jwt',token,{
            maxAge:24*60*60*1000,
            httpOnly:true
        })
        // res.status(201).json({
        //     status:'success',
        //     token,
        //     data:{
        //         user:newUser
        //     }
        // })
        res.status(301).redirect('/app/v1/blogs/home')
    }catch(error){
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}

const login = async (req,res)=>{
    try{
        const email= req.body.email
        const password = req.body.password

        const existingUser = await User.findOne({email:email})
        if(existingUser){
            //check the password
            const verifiedUser = await bcrypt.compare(password,existingUser.password)
          
            if(verifiedUser){
                const token = await genToken(existingUser._id)
                res.cookie('jwt',token,{
                    maxAge:24*60*60*1000,
                    httpOnly:true
                })
                // return res.status(200).json({
                //     status:"success",
                //     token,
                //     data:{
                //         user:existingUser
                //     }
                // })
                res.status(301).redirect('/app/v1/blogs/home')
            }
                
        }
        else{
            return res.status(400).json({
                status:"fail",
                data:"email id or password is not matching/existed"
            })
        }
        
    }catch(error){

    }
}

const logout = (req,res)=>{
    res.clearCookie('jwt')
    res.redirect('/app/v1/user/signup')
}

module.exports = {
    signUp,login,getSignup,getLogin,logout
}