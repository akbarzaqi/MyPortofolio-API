const { ExperienceHandler } = require('./experienceHandler');
const { ExperienceService } = require('../../service/ExperienceService');
const { ExperienceValidator } = require('../../validator/experience/index');

const experienceService = new ExperienceService();
const experienceValidator = ExperienceValidator;
const experienceHandler = new ExperienceHandler(experienceService, experienceValidator);

module.exports = { experienceHandler };