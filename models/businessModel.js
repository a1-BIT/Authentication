const mongoose = require('mongoose');
const Joi = require('joi')

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 2500,
    },
    category: {
        type: String,
        required: true,
        enum: ['Restaurant', 'Retail', 'Service', 'Other'],
    },
    contact: {
        phone: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 10,
        },
        email: {
            type: String,
            required: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Basic email validation
        }
    },
    address: {
        street: String,
        city: {
            type: String,
            required: true,
        },
        state: String,
        postalCode: String,
        country: String
    },
    hours: {
        monday: { open: String, close: String },
        tuesday: { open: String, close: String },
        wednesday: { open: String, close: String },
        thursday: { open: String, close: String },
        friday: { open: String, close: String },
        saturday: { open: String, close: String },
        sunday: { open: String, close: String },
    },
    images: [String],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }
}, { timestamps: true });

const Business = mongoose.model('Business', businessSchema);


exports.Business = Business