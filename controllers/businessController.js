const _ = require('lodash')
const { Business, validate } = require('../models/businessModel')

exports.registerBusiness = async function (req, res) {

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let business = await Business.findOne({ "contact.phone": req.body.contact.phone })
    if (business) return res.status(400).send("Business with this phone number already registered.");

    business = new Business(_.pick(req.body, ['name', 'description', 'category', 'contact', 'address', 'hours', 'images', 'rating']));
    await business.save();
    res.status(201).send(_.pick(business, ['_id', 'name', 'description', 'category', 'contact', 'address']));
}

exports.getBusiness = async function (req, res) {
    try {
        const business = await Business.find().sort('name')
        res.send(business)
    } catch (error) {
        res.status(500).send('Something failed')
    }

}