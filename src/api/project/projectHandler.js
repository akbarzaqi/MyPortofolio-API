const autoBind = require("auto-bind").default;

class ProjectHandler {
    constructor(projectService, projectValidator) {
        this._projectService = projectService;
        this._projectValidator = projectValidator;

        autoBind(this);
    }

    async postProjectHandler(req, res) {
        try {
            this._projectValidator.validateProjectPayload(req.body);
            const {title, slug, description, status, is_featured, cover_url, category_ids, technology_ids} = req.body;
            console.log(req.body);
            const projectId = await this._projectService.createProject({title, slug, description, status, is_featured, cover_url, category_ids, technology_ids});

            res.status(201).json({
                status: "success",
                message: "Project created successfully",
                data: {
                    projectId,
                },
            });
        }catch (error) {
            return res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async getProjectByIDHandler(req, res) {
        try {
            const {id} = req.params;
            const project = await this._projectService.getProjectsByID(id);

            res.status(200).json({
                status: "success",
                data: {
                    project,
                },
            });

        }catch (error) {
            return res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async getProjectsHandler(req, res) {
        try {
            const projects = await this._projectService.getProjects();

            res.status(200).json({
                status: "success",
                data: {
                    projects,
                },
            });
        } catch (error) {
            return res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async updateProjectHandler(req, res) {
        try {
            const {id} = req.params;
            this._projectValidator.validateProjectPayload(req.body);
            
            const existingCoverUrl = await this._projectService.getProjectsByID(id);

            const {title, slug, description, status, is_featured, cover_url, filename, category_ids, technology_ids} = req.body;

            const updateData = {
                title,
                slug,
                description,
                status,
                is_featured,
                category_ids,
                technology_ids,
            };

            if(cover_url) {
                updateData.cover_url = cover_url;
                updateData.filename = filename;
            }

            console.log("ini update data : ",updateData);

            const projectId = await this._projectService.updateProject(id, updateData);

            res.status(200).json({
                status: "success",
                message: "Project updated successfully",
                data: {
                    projectId,
                },
            });
        } catch (error) {
            return res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async deleteProjectHandler(req, res) {
        try {
            const {id} = req.params;
            await this._projectService.deleteProject(id);

            res.status(200).json({
                status: "success",
                message: "Project deleted successfully",
            });
        } catch (error) {
            return res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

}

module.exports = { ProjectHandler };