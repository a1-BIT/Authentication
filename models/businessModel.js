const mongoose = require('mongoose');
const Joi = require('joi')

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
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
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
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

function validateBusiness(business) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        description: Joi.string().min(10).max(2500).required(),
        category: Joi.string().valid('Restaurant', 'Retail', 'Service', 'Other').required(),
        contact: Joi.object({
            phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),  // Ensuring only digits and a fixed length of 10
            email: Joi.string().email().required()
        }).required(),
        address: Joi.object({
            street: Joi.string().allow(''),  // Allow empty strings if street is optional
            city: Joi.string().required(),
            state: Joi.string().allow(''),
            postalCode: Joi.string().allow(''),
            country: Joi.string().allow('')
        }),
        hours: Joi.object({
            monday: Joi.object({ open: Joi.string().allow(''), close: Joi.string().allow('') }),
            tuesday: Joi.object({ open: Joi.string().allow(''), close: Joi.string().allow('') }),
            wednesday: Joi.object({ open: Joi.string().allow(''), close: Joi.string().allow('') }),
            thursday: Joi.object({ open: Joi.string().allow(''), close: Joi.string().allow('') }),
            friday: Joi.object({ open: Joi.string().allow(''), close: Joi.string().allow('') }),
            saturday: Joi.object({ open: Joi.string().allow(''), close: Joi.string().allow('') }),
            sunday: Joi.object({ open: Joi.string().allow(''), close: Joi.string().allow('') })
        }).optional(),
        images: Joi.array().items(Joi.string().uri()).optional(),  // Assuming URLs for images
        rating: Joi.number().min(0).max(5).optional()
    });

    return schema.validate(business);
}



exports.Business = Business
exports.validate = validateBusiness