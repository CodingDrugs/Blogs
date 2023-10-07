const {Schema,model} = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator') //used to validate the strings 

const authSchema = new Schema({
    user:{
        type:String,
        required: [true,"user field is required"],
        minlength:[4,"user field should contain character above 4"]
    },
    email:{
        type:String,
        required:[true,'please enter your email'],
        unique:true,
        validate:[validator.isEmail,'Please enter proper email']
    },
    password:{
        type:String,
        required:[true,'Enter your password'],
        minlength:[8,'password should contain minimum 8 characters']
    },
    confirmPassword:{
        type:String,
        required:[true,'Confirm your password'],
        select:false,
        validate:{ //custom validator
            validator:function(value){
                return this.password===value;
            },
            message:"password doesn't match"
        }
        
    }
},
{
    timestamps:true
})

//save and create // hook
authSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,10) // 10 times it will sort the algorithm
    next()
})

const User=model('user',authSchema)

module.exports=User;

