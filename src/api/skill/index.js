const { SkillHandler } = require('./skillHandler');
const { SkillService } = require('../../service/SkillService');
const { SkillValidator } = require('../../validator/skill/index');

const skillService = new SkillService();
const skillValidator = SkillValidator;
const skillHandler = new SkillHandler(skillService, skillValidator);

module.exports = { skillHandler };