const Blog = require("../models/Blog")
const fs = require('fs')

const getHome = async(req,res)=>{
    try{
        const blogs= await Blog.find().sort({createdAt: -1}) // to get recent values
        res.status(200).render('home',{blogs})
    }catch(error){
        res.status(400).json({
            status:'fail',
            message:error.message 
        })
    }
}


const getAbout = (req,res)=>{
    try{
        res.status(200).render("about")
    }catch{
        res.status(400).json({message:error.message})
    }
}

const getCreateBlog = (req,res)=>{
    try{
        res.status(200).render("createBlog")
    }catch{
        res.status(400).json({message:error.message})
    }
}

const createBlog = async(req,res)=>{
    try{
        let payload = req.body
        let photo=req.file
        await Blog.create({...payload,photo})
        res.status(201).redirect('/app/v1/blogs/home')
    } catch(error){
    res.status(400).json({
        status: 'fail',
        message:error.message
    })
}
}


const getAllBlogs = async (req,res)=>{
    try{
        const blogs=await Blog.find()
        res.status(200).render("list",{blogs})
        
        
    }catch(error){
        res.status(400).json({
            status: 'fail',
            message:error.message
        })
    }
}

const getBlog = async (req,res)=>{
    try{
        const {id}=req.params
        const blog = await Blog.findById(id)
       
        res.status(200).render("blog",{blog})
    }catch(error){
        res.status(400).json({
            status: 'fail',
            message:error.message
        })
    }
}

const deleteBlog = async (req,res)=>{
    try{
        const {id}= req.params
        const blog=await Blog.findById(id)
        let [{path}]= blog.photo
        console.log(path);
        fs.unlinkSync(path)
        await Blog.findByIdAndDelete(id)
       
        res.status(201).redirect('/app/v1/blogs/home')
    }catch(error){
        res.status(400).json({
            status: 'fail',
            message:error.message
        })
    }

}


module.exports = {
    createBlog,getAllBlogs,getBlog,deleteBlog,getHome,getAbout,getCreateBlog
}



