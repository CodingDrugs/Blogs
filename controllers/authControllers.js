const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') // to create token

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
        const token = await jwt.sign({id:newUser._id},"secretString")
        res.status(201).json({
            status:'success',
            token,
            data:{
                user:newUser
            }
        })
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
                return res.status(200).json({
                    status:"success",
                    data:{
                        user:existingUser
                    }
                })
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

module.exports = {
    signUp,login
}