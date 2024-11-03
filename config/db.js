const mongoose = require('mongoose');
const { databaseUri } = require('./env');

const connectDB = async () => {
    const options = {
        autoIndex: false, // Disable automatic indexing for performance
        serverSelectionTimeoutMS: 5000, // Timeout in milliseconds
        retryWrites: true, // Retry failed writes
        w: 'majority' // Write acknowledgment level
    };

    try {
        await mongoose.connect(databaseUri, options);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed', error);
        process.exit(1);
    }
};

module.exports = connectDB;