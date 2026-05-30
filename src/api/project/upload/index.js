const { UploadprojectHandler } = require("./uploadProjectHandler");
const { ProjectService } = require("../../../service/ProjectService");
const { ProjectValidator } = require("../../../validator/project/index");

const projectService = new ProjectService();
const projectValidator = ProjectValidator;
const uploadHandler = new UploadprojectHandler(projectService, projectValidator);

module.exports = { uploadHandler };