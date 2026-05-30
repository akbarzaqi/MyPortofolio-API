const {EducationHandler} = require('./educationHandler');
const {EducationService} = require('../../service/EducationService');
const {EducationValidator} = require('../../validator/education/index');

const educationService = new EducationService();
const educationValidator = EducationValidator;
const educationHandler = new EducationHandler(educationService, educationValidator);

module.exports = { educationHandler };