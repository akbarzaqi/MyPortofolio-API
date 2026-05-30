const Joi = require("joi");
const { user } = require("pg/lib/defaults");

const EducationPayloadSchema = Joi.object({
    institution: Joi.string().required(),
    user_id: Joi.string().required(),
    degree: Joi.string().required(),
    field_of_study: Joi.string().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    description: Joi.string().optional(),
})

module.exports = { EducationPayloadSchema };