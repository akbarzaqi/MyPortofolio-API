const Joi = require("joi");

const ProfilePayloadSchema = Joi.object({
    user_id: Joi.string().required(),
    full_name: Joi.string().required(),
    bio: Joi.string().required(),
    location: Joi.string().required(),
    social_links: Joi.object().pattern(Joi.string(), Joi.string()).optional(),
    headline: Joi.string().max(255).required()

})

module.exports = { ProfilePayloadSchema };