const express = require('express')
const { welcome } = require('../controllers/authController')
const router = express.Router()

router.get('/welcome', welcome)


module.exports = router