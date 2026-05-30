const {ProjectHandler} = require('./projectHandler');
const {ProjectService} = require('../../service/ProjectService');
const {ProjectValidator} = require('../../validator/project/index');

const projectService = new ProjectService();
const projectValidator = ProjectValidator;
const projectHandler = new ProjectHandler(projectService, projectValidator);

module.exports = { projectHandler };