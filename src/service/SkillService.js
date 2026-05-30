const { Pool } = require("pg");
const { nanoid } = require("nanoid");

class SkillService {
    constructor() {
        this.Pool = new Pool({
            user: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            host: process.env.DB_HOST || "localhost",
            port: 5432,
        });
    }

    async createSkill({ user_id, skill_name, proficiency_level, category }) {
        const id = `skill-${nanoid(16)}`;

        const existingUserQuery = {
            text: "SELECT id FROM users WHERE id = $1",
            values: [user_id],
        };
        const existingUserResult = await this.Pool.query(existingUserQuery);

        if (existingUserResult.rowCount === 0) {
            throw new Error(`User with id ${user_id} not found`);
        }

        const query = {
            text: "INSERT INTO skills (id, user_id, skill_name, proficiency_level, category) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            values: [id, user_id, skill_name, proficiency_level, category],
        };

        const result = await this.Pool.query(query);

        return result.rows[0].id;
    }

    async getAllSkills() {
        const query = {
            text: "SELECT id, user_id, skill_name, proficiency_level, category FROM skills",
        };
        const result = await this.Pool.query(query);

        if (result.rowCount === 0) {
            throw new Error("No skills found");
        }

        return result.rows;
    }

    async getSkillsById(id) {
        const query = {
            text: "SELECT id, user_id, skill_name, proficiency_level, category FROM skills WHERE id = $1",
            values: [id],
        };
        const result = await this.Pool.query(query);

        if (result.rowCount === 0) {
            throw new Error(`No skills found for id ${id}`);
        }

        return result.rows;
    }

    async updateSkill(id, { user_id, skill_name, proficiency_level, category }) {
        const existingSkillQuery = {
            text: "SELECT id FROM skills WHERE id = $1",
            values: [id],
        };
        const existingSkillResult = await this.Pool.query(existingSkillQuery);

        console.log('existingSkillResult:', existingSkillResult);

        if (existingSkillResult.rowCount === 0) {
            throw new Error(`Skill with id ${id} not found`);
        }

        const query = {
            text: "UPDATE skills SET user_id = $1, skill_name = $2, proficiency_level = $3, category = $4 WHERE id = $5",
            values: [user_id, skill_name, proficiency_level, category, id],
        };

        await this.Pool.query(query);
    }

    async deleteSkill(id) {
        const existingSkillQuery = {
            text: "SELECT id FROM skills WHERE id = $1",
            values: [id],
        };
        const existingSkillResult = await this.Pool.query(existingSkillQuery);

        if (existingSkillResult.rowCount === 0) {
            throw new Error(`Skill with id ${id} not found`);
        }

        const query = {
            text: "DELETE FROM skills WHERE id = $1",
            values: [id],
        };

        await this.Pool.query(query);
    }

}

module.exports = { SkillService };