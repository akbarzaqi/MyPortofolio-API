const autoBind = require("auto-bind").default;

class EducationHandler {
    constructor(educationService, educationValidator) {
        this._educationService = educationService;
        this._educationValidator = educationValidator;

        autoBind(this);
    }

    async postEducationHandler(req, res) {
        try {
            this._educationValidator.validateEducationPayload(req.body);
            const { user_id, institution, degree, field_of_study, start_date, end_date, description } = req.body;
            const educationId = await this._educationService.createEducation({ user_id, institution, degree, field_of_study, start_date, end_date, description });

            res.status(201).json({
                status: "success",
                message: "Education created successfully",
                data: {
                    educationId,
                },
            });
        } catch (error) {
            return res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async getAllEducationHandler(req, res) {
        try {
            const { user_id } = req.params;
            const education = await this._educationService.getAllEducation();

            res.status(200).json({
                status: "success",
                data: {
                    education,
                },
            });
        } catch (error) {
            return res.status(404).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async getEducationByIdHandler(req, res) {
        try {
            const { id } = req.params;
            const education = await this._educationService.getEducationById(id);

            res.status(200).json({
                status: "success",
                data: {
                    education,
                },
            });
        } catch (error) {
            return res.status(404).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async updateEducationHandler(req, res) {
        try {
            const { id } = req.params;
            this._educationValidator.validateEducationPayload(req.body);
            const { user_id, institution, degree, field_of_study, start_date, end_date, description } = req.body;
            await this._educationService.updateEducation(id, { user_id, institution, degree, field_of_study, start_date, end_date, description });

            res.status(200).json({
                status: "success",
                message: "Education updated successfully",
            });
        } catch (error) {
            return res.status(404).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async deleteEducationHandler(req, res) {
        try {
            const { id } = req.params;
            await this._educationService.deleteEducation(id);

            res.status(200).json({
                status: "success",
                message: "Education deleted successfully",
            });
        } catch (error) {
            return res.status(404).json({
                status: "fail",
                message: error.message,
            });
        }
    }
}

module.exports = {EducationHandler};