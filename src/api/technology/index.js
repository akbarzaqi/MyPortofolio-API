const { TechnologyHandler } = require("./technologyHandler");
const { TechnologyService } = require("../../service/TechnologyService");
const { TechnologyValidator } = require("../../validator/technology/index");

const technologyService = new TechnologyService();
const technologyValidator = TechnologyValidator;
const technologyHandler = new TechnologyHandler(technologyService, technologyValidator);

module.exports = { technologyHandler };