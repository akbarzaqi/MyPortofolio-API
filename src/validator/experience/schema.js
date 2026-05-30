const Joi = require("joi");

const ExperiencePayloadSchema = Joi.object({
    company: Joi.string().required(),
    user_id: Joi.string().required(),
    position: Joi.string().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().optional(),
    description: Joi.string().optional(),
})

module.exports = { ExperiencePayloadSchema };