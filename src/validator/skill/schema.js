const Joi = require('joi');

const SkillPayloadSchema = Joi.object({
    user_id: Joi.string().required(),
    skill_name: Joi.string().required(),
    proficiency_level: Joi.string().required(),
    category: Joi.string().required()
})

module.exports = { SkillPayloadSchema };