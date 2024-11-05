const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/env')

module.exports = function auth(req, res, next) {

    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('Access denied. No token provided.')

    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.user = decoded
        next()
    } catch (error) {
        res.status(400).send('Invalid Token.')
    }

}