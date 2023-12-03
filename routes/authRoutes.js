const express = require('express')
const {signUp, login, getSignup, getLogin, logout} = require('../controllers/authControllers')
let router = express.Router()


router.get('/signup',getSignup)
router.post('/signup',signUp)
router.get('/login',getLogin)
router.post('/login',login)
router.get('/logout',logout)


module.exports = router;  