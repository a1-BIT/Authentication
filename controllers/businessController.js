const _ = require('lodash')
const { Business } = require('../models/businessModel')


exports.registerBusiness = async function (req, res) {
    let user = await Business.findOne({ email: req.body.email })

}