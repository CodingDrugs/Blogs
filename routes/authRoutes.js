const express = require('express')
const {signUp, login} = require('../controllers/authControllers')
let router = express.Router()


router.post('/signup',signUp)
router.post('/login',login)

module.exports = router;  