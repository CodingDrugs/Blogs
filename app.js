const express = require('express') 
const blogRouter = require("./routes/blogRoutes")
const mongoose = require('mongoose')
const methodOverRide = require('method-override')
const authRouter = require('./routes/authRoutes')
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
let app = express() 

app.use(helmet())  // is used to protect header in middle layer network
//register the template engine
app.set("view engine","ejs")

mongoose.connect(process.env.MONGODB_CLOUD_URL).then(()=>{
    console.log('DB connected');
}).catch((err)=>{
    console.log(err)
})



app.use(cookieParser())
app.use(express.json()) 
app.use(express.urlencoded({extended:true})) // to use form data
app.use(express.static("public"))
app.use(methodOverRide("_method"))
app.use('/app/v1/blogs',blogRouter)  
app.use('/app/v1/user',authRouter)  



app.get("/set-cookie",(req,res)=>{
    res.cookie("cookie key","cookie value",{
        maxAge:5000,
        httpOnly:true
    })
    res.send("cookie was set")
})

app.get('/get-cookie',(req,res)=>{
    res.send(req.cookies)
})

app.get('/delete-cookie',(req,res)=>{
    res.clearCookie("jwt")
})

module.exports= app;