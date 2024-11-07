const Joi = require('joi')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/env')
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024,
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'User']
    }
})

userSchema.methods.genrateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, role: this.role }, jwtSecret)
    return token
}

const User = mongoose.model('User', userSchema)


function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    const result = schema.validate(user);
    return result;
}

exports.User = User;
exports.validate = validateUser;
