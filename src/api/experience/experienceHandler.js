const autoBind = require("auto-bind").default;

class ExperienceHandler {
    constructor(experienceService, experienceValidator) {
        this._experienceService = experienceService;
        this._experienceValidator = experienceValidator;

        autoBind(this);
    }

    async postExperienceHandler(req, res) {
        try {
            this._experienceValidator.validateExperiencePayload(req.body);
            const { user_id, company, position, start_date, end_date, description } = req.body;
            const experienceId = await this._experienceService.createExperience({ user_id, company, position, start_date, end_date, description });

            res.status(201).json({
                status: "success",
                message: "Experience created successfully",
                data: {
                    experienceId,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async getAllExperienceHandler(req, res) {
        try {
            const experience = await this._experienceService.getAllExperience();

            res.status(200).json({
                status: "success",
                data: {
                    experience,
                },
            });
        }catch (error) {
            res.status(404).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async getExperienceByIdHandler(req, res) {
        try {
            const { id } = req.params;
            const experience = await this._experienceService.getExperienceById(id);

            res.status(200).json({
                status: "success",
                data: {
                    experience,
                },
            });
        }catch (error) {
            res.status(404).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async updateExperienceHandler(req, res) {
        try {
            const { id } = req.params;
            this._experienceValidator.validateExperiencePayload(req.body);
            const { user_id, company, position, start_date, end_date, description } = req.body;
            await this._experienceService.updateExperience(id, { user_id, company, position, start_date, end_date, description });

            res.status(200).json({
                status: "success",
                message: "Experience updated successfully",
            });
        }catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async deleteExperienceHandler(req, res) {
        try {
            const { id } = req.params;
            await this._experienceService.deleteExperience(id);

            res.status(200).json({
                status: "success",
                message: "Experience deleted successfully",
            });
        }catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }
}

module.exports = { ExperienceHandler };