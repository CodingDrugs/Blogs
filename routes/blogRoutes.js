const { getAllBlogs, getBlog, createBlog, deleteBlog, getHome, getCreateBlog, getAbout } = require("../controllers/blogControllers")
const verifyToken = require("../middlewares/authMiddleware")
const storage = require("../middlewares/multer")
const multer = require("multer")
const upload = multer({storage:storage})


const router = require("express").Router()


router.get('/home',verifyToken,getHome)
router.get('/about',getAbout)
router.get('/list',getAllBlogs)
router.get('/list/:id',getBlog)
router.get('/create-blog',getCreateBlog)
router.post('/create-blog',upload.single("photo"),createBlog)
router.delete('/list/:id',deleteBlog)

module.exports = router