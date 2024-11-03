require('dotenv').config()

module.exports = {
    port: process.env.PORT || 3000,
    databaseUri: process.env.DATABASE_URI,
    jwtSecret: process.env.JWT_SECRET
}