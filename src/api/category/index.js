const { CategoryValidator } = require('../../validator/category/index');
const { CategoryService } = require('../../service/CategoryService');
const { CategoryHandler } = require('./categoryHandler');

const categoryService = new CategoryService();
const categoryValidator = CategoryValidator;
const categoryHandler = new CategoryHandler(categoryService, categoryValidator);

module.exports = { categoryHandler };