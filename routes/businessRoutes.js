const express = require('express')
const router = express.Router()
const Auth = require('../middleware/auth')
const Role = require('../middleware/role')
const BusinessController = require('../controllers/businessController')

router.post('/registerBusiness', [Auth, Role], BusinessController.registerBusiness)
router.get('/getBusiness', Auth, BusinessController.getBusiness)

module.exports = router;