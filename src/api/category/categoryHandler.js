const autoBind = require("auto-bind").default;

class CategoryHandler {
    constructor(categoryService, categoryValidator) {
        this._categoryService = categoryService;
        this._categoryValidator = categoryValidator;

        autoBind(this);
    }

    async postCategoryHandler(req, res) {
        try {
            this._categoryValidator.validateCategoryPayload(req.body);

            console.log('postCategoryHandler req.body:', req.body);

            const categoryId = await this._categoryService.createCategory(req.body);

            res.status(201).json({
                status: "success",
                message: "Category created successfully",
                data: {
                    categoryId,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async getCategoryHandler(req, res) {
        try {
            const categories = await this._categoryService.getCategories();

            console.log('in get category handler')

            res.status(200).json({
                status: "success",
                data: {
                    categories,
                },
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async getCategoryByIdHandler(req, res) {
        try {
            const {id} = req.params;
            const category = await this._categoryService.getCategoryById(id);

            res.status(200).json({
                status: "success",
                data: {
                    category,
                },
            });
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async putCategoryHandler(req, res) {
        try {
            const {id} = req.params;
            this._categoryValidator.validateCategoryPayload(req.body);

            const categoryId = await this._categoryService.updateCategory(id, req.body);

            res.status(200).json({
                status: "success",
                message: "Category updated successfully",
                data: {
                    categoryId,
                },
            });
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async deleteCategoryHandler(req, res) {
        try {
            const {id} = req.params;

            await this._categoryService.deleteCategory(id);

            res.status(200).json({
                status: "success",
                message: "Category deleted successfully",
            });
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: error.message,
            });
        }
    }
    
}

module.exports = { CategoryHandler };