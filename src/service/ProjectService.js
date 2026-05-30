const {Pool} = require("pg");
const {nanoid} = require("nanoid");
const { text } = require("express");
const path = require("path");
const fs = require("fs");

class ProjectService {
    constructor() {
        this.Pool = new Pool({
            user: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            host: process.env.DB_HOST || "localhost",
            port: 5432,
        });
    }

    async createProject({title, slug, description, status, is_featured, cover_url, category_ids, technology_ids}) {

        for(const categoryId of category_ids) {
            const query = {
                text: "SELECT id FROM categories WHERE id = $1",
                values: [categoryId],
            };
            const result = await this.Pool.query(query);
            if(result.rowCount === 0) {
                throw new Error(`Category with id ${categoryId} not found`);
            }
        }

        for(const technologyId of technology_ids) {
            const query = {
                text: "SELECT id FROM technology WHERE id = $1",
                values: [technologyId],
            };
            const result = await this.Pool.query(query);
            if(result.rowCount === 0) {
                throw new Error(`Technology with id ${technologyId} not found`);
            }
        }

        const id = `project-${nanoid(16)}`;
        const query = {
            text: "INSERT INTO projects (id, title, slug, description, status, is_featured, cover_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
            values: [id, title, slug, description, status, is_featured, cover_url],
        };
        const result = await this.Pool.query(query);

        const projectId = result.rows[0].id;

        for(const categoryId of category_ids) {
            const query = {
                text: "INSERT INTO projects_categories (project_id, category_id) VALUES ($1, $2)",
                values: [projectId, categoryId],
            };
            await this.Pool.query(query);
        }

        for(const technologyId of technology_ids) {
            const query = {
                text: "INSERT INTO projects_technology (project_id, technology_id) VALUES ($1, $2)",
                values: [projectId, technologyId],
            };
            await this.Pool.query(query);
        }

        return result.rows[0].id;
    }

    async getProjectsByID(projectId) {
        const query = {
            text: "SELECT id, title, slug, description, status, is_featured, cover_url FROM projects WHERE id = $1",
            values: [projectId],
        };
        const result = await this.Pool.query(query);

        if(result.rowCount === 0) {
            throw new Error(`Project with id ${projectId} not found`);
        }

        const queryCategories = {
            text: "SELECT c.id, c.name, c.slug FROM categories c JOIN projects_categories pc ON c.id = pc.category_id WHERE pc.project_id = $1",
            values: [projectId],
        };
        const resultCategories = await this.Pool.query(queryCategories);

        const queryTechnology = {
            text: "SELECT t.id, t.name, t.slug FROM technology t JOIN projects_technology pt ON t.id = pt.technology_id WHERE pt.project_id = $1",
            values: [projectId],
        };
        const resultTechnology = await this.Pool.query(queryTechnology);

        return {
            ...result.rows[0],
            categories: resultCategories.rows,
            technology: resultTechnology.rows,
        }
    }
    
    async getProjects() {
        const query = {
            text: "SELECT id, title, slug, description, status, is_featured, cover_url FROM projects",
        };
        const result = await this.Pool.query(query);

        const projects = result.rows;

        for(const project of projects) {
            const queryCategories = {
                text: "SELECT c.id, c.name, c.slug FROM categories c JOIN projects_categories pc ON c.id = pc.category_id WHERE pc.project_id = $1",
                values: [project.id],
            };
            const resultCategories = await this.Pool.query(queryCategories);

            const queryTechnology = {
                text: "SELECT t.id, t.name, t.slug FROM technology t JOIN projects_technology pt ON t.id = pt.technology_id WHERE pt.project_id = $1",
                values: [project.id],
            };
            const resultTechnology = await this.Pool.query(queryTechnology);

            project.categories = resultCategories.rows;
            project.technology = resultTechnology.rows;
        }

        return projects;
    }

    async updateProject(id, {title, slug, description, status, is_featured, cover_url, filename, category_ids, technology_ids}) {
        const existingProject = await this.getProjectsByID(id);

        if (!existingProject) {
            throw new Error('Project not found');
        }

        const query = {
            text: "UPDATE projects SET title = $1, slug = $2, description = $3, status = $4, is_featured = $5, cover_url = $6 WHERE id = $7 RETURNING id",
            values: [title, slug, description, status, is_featured, cover_url, id],
        };

        const result = await this.Pool.query(query);

        const projectId = result.rows[0].id;

        await this.Pool.query({
            text: "DELETE FROM projects_categories WHERE project_id = $1",
            values: [projectId],
        });

        await this.Pool.query({
            text: "DELETE FROM projects_technology WHERE project_id = $1",
            values: [projectId],
        });

        for(const categoryId of category_ids) {
            const query = {
                text: "INSERT INTO projects_categories (project_id, category_id) VALUES ($1, $2)",
                values: [projectId, categoryId],
            };
            await this.Pool.query(query);
        }

        for(const technologyId of technology_ids) {
            const query = {
                text: "INSERT INTO projects_technology (project_id, technology_id) VALUES ($1, $2)",
                values: [projectId, technologyId],
            };
            await this.Pool.query(query);
        }

        return result.rows[0].id;
    }

    async deleteProject(id) {
        const existingProject = await this.getProjectsByID(id);

        if (!existingProject) {
            throw new Error('Project not found');
        }

        await this.Pool.query({
            text: "DELETE FROM projects_categories WHERE project_id = $1",
            values: [id],
        });

        await this.Pool.query({
            text: "DELETE FROM projects_technology WHERE project_id = $1",
            values: [id],
        });

        const query = {
            text: "DELETE FROM projects WHERE id = $1 RETURNING id",
            values: [id],
        };

        const result = await this.Pool.query(query);

        return result.rows[0].id;
    }
}

module.exports = { ProjectService };