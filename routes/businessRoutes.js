const express = require('express')
const router = express.Router()
const Auth = require('../middleware/auth')
const BusinessController = require('../controllers/businessController')

router.post('/registerBusiness', Auth, BusinessController.registerBusiness)

module.exports = router;