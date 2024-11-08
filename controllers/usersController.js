const _ = require('lodash')
const bcrypt = require('bcrypt')
const { User, validate } = require('../models/userModel')


exports.register = async function (req, res) {

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered')

    user = new User(_.pick(req.body, ['name', 'email', 'password']))

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    const toekn = user.genrateAuthToken()
    res.header('x-auth-token', toekn).send(_.pick(user, ['_id', 'name', 'email']))
}