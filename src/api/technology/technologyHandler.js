const autoBind = require("auto-bind").default;

class TechnologyHandler {
    constructor(technologyService, technologyValidator) {
        this._technologyService = technologyService;
        this._technologyValidator = technologyValidator;

        autoBind(this);
    }

    async postTechnologyHandler(req, res) {
        try {
            console.log('req.body [technologyHandler.js] postTechnologyHandler:', req.body);
            this._technologyValidator.validateTechnologyPayload(req.body);

            const technologyId = await this._technologyService.createTechnology(req.body);

            res.status(201).json({
                status: "success",
                message: "Technology created successfully",
                data: {
                    technologyId,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async getTechnologiesHandler(req, res) {
        try {
            const technologies = await this._technologyService.getTechnology();

            res.status(200).json({
                status: "success",
                data: {
                    technologies,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async getTechnologyByIdHandler(req, res) {
        try {
            const { id } = req.params;
            const technology = await this._technologyService.getTechnologyById(id);

            res.status(200).json({
                status: "success",
                data: {
                    technology,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async putTechnologyHandler(req, res) {
        const { id } = req.params;
        try {
            this._technologyValidator.validateTechnologyPayload(req.body);

            await this._technologyService.updateTechnology(id, req.body);

            res.status(200).json({
                status: "success",
                message: "Technology updated successfully",
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async deleteTechnologyHandler(req, res) {
        const { id } = req.params;
        try {
            await this._technologyService.deleteTechnology(id);

            res.status(200).json({
                status: "success",
                message: "Technology deleted successfully",
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }
}

module.exports = { TechnologyHandler };