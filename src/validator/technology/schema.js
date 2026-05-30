const Joi = require("joi");

const TechnologyPayloadSchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
  tech_category: Joi.string().required(),
});

module.exports = { TechnologyPayloadSchema };