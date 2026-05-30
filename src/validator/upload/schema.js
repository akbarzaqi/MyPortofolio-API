const Joi = require('joi');

const UploadPayloadSchema = Joi.object({
    content_type : Joi.string().valid('image/jpeg', 'image/png', 'image/gif').required(),
}).unknown();

module.exports = { UploadPayloadSchema };