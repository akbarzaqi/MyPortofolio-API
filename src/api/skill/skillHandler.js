const autoBind = require("auto-bind").default;

class SkillHandler {
    constructor(skillService, skillValidator) {
        this._skillService = skillService;
        this._skillValidator = skillValidator;

        autoBind(this);
    }

    async postSkillHandler(req, res) {
        try {
            this._skillValidator.validateSkillPayload(req.body);
            const { user_id, skill_name, proficiency_level, category } = req.body;
            const skillId = await this._skillService.createSkill({ user_id, skill_name, proficiency_level, category });

            res.status(201).json({
                status: "success",
                message: "Skill created successfully",
                data: {
                    skillId,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async getAllSkillsHandler(req, res) {
        try {
            const skills = await this._skillService.getAllSkills();

            res.status(200).json({
                status: "success",
                data: {
                    skills,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async getSkillByIdHandler(req, res) {
        try {
            const { id } = req.params;
            const skills = await this._skillService.getSkillsById(id);

            res.status(200).json({
                status: "success",
                data: {
                    skills,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async updateSkillHandler(req, res) {
        try {
            const { id } = req.params;
            this._skillValidator.validateSkillPayload(req.body);
            const { user_id, skill_name, proficiency_level, category } = req.body;
            await this._skillService.updateSkill(id, { user_id, skill_name, proficiency_level, category });

            res.status(200).json({
                status: "success",
                message: "Skill updated successfully",
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async deleteSkillHandler(req, res) {
        try {
            const { id } = req.params;
            await this._skillService.deleteSkill(id);

            res.status(200).json({
                status: "success",
                message: "Skill deleted successfully",
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }
}

module.exports = { SkillHandler };