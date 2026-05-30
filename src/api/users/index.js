const { UsersHandler } = require("./usersHandler");
const { UsersService } = require("../../service/UsersService");
const { UsersValidator } = require("../../validator/users/index");

const usersService = new UsersService();
const usersValidator = UsersValidator;
const usersHandler = new UsersHandler(usersService, usersValidator);

module.exports = { usersHandler };