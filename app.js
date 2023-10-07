const express = require('express') 
const blogRouter = require("./routes/blogRoutes")
const mongoose = require('mongoose')
const methodOverRide = require('method-override')
const authRouter = require('./routes/authRoutes')
let app = express() 

//register the template engine
app.set("view engine","ejs")

mongoose.connect('mongodb://127.0.0.1:27017/blogDB').then(()=>{
    console.log('DB connected');
}).catch((err)=>{
    console.log(err)
})


app.use(express.json()) 
app.use(express.urlencoded({extended:true})) // to use form data
app.use(express.static("public"))
app.use(methodOverRide("_method"))
app.use('/app/v1/blogs',blogRouter)  
app.use('/app/v1/user',authRouter)  

module.exports= app;