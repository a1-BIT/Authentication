const _ = require('lodash')
const { Business, validate } = require('../models/businessModel')


exports.registerBusiness = async function (req, res) {

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let business = await Business.findOne({ "contact.phone": req.body.contact.phone })
    if (business) return res.status(400).send("Business with this phone number already registered.");

}