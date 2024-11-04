const Joi = require('joi')
const bcrypt = require('bcrypt')
const { User } = require('../models/userModel')

exports.login = async function (req, res) {

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password.')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password.')

    const toekn = user.genrateAuthToken()


    res.status(200).send(toekn)

}

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    const result = schema.validate(user);
    return result;
}