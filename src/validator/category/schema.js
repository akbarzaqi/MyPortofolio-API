const Joi = require('joi');

const CategoryPayloadSchema = Joi.object({
    name: Joi.string().required(),
    slug: Joi.string().required(),
});

module.exports = { CategoryPayloadSchema };