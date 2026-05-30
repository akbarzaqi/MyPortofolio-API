const Joi = require("joi");

const ProjectPayloadSchema = Joi.object({
    title: Joi.string().required(),
    slug: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid("draft", "in-progress", "completed", "archived").required(),
    is_featured: Joi.boolean().required(),
    cover_url: Joi.string().required(),
    category_ids: Joi.array().items(Joi.string()).required(),
    technology_ids: Joi.array().items(Joi.string()).required(),
})

module.exports = { ProjectPayloadSchema };