const {Schema,model} = require('mongoose')


const blogSchema = new Schema({
    title:{
        type:String,
        require:[true,"Title field cant be empty"],
        unique:true,
        minlength:[4,"Title should be greater than 4 length"]
    },
    snippet:{
        type:String,
        require:[true,"Snippet field cant be empty"],
        minlength:[10,"Snippet should be greater than 10 length"]
    },
    photo:{
        type:[""],
        required: true
    },
    description:{
        type:String,
        require:[true,"Description field cant be empty"],
        minlength:[20,"Description should be greater than 20 length"]
    },
},
{
    timestamps: true
})

const Blog = model("blog",blogSchema)  // blog is a collection, we are adding the validation schema to the blog

module.exports= Blog;

