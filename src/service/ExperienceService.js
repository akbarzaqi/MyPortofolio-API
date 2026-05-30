const {Pool} = require('pg');
const {nanoid} = require('nanoid');

class ExperienceService {
    constructor() {
        this.Pool = new Pool({
            user: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            host: process.env.DB_HOST || 'localhost',
            port: 5432,
        });
    }

    async createExperience({user_id, company, position, start_date, end_date, description}) {
        const id = `exp-${nanoid(16)}`;

        const existingUserQuery = {
            text: 'SELECT id FROM users WHERE id = $1',
            values: [user_id],
        };

        const existingUserResult = await this.Pool.query(existingUserQuery);

        if (existingUserResult.rowCount === 0) {
            throw new Error('User not found');
        }

        const query = {
            text: 'INSERT INTO experience (id, user_id, company, position, start_date, end_date, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [id, user_id, company, position, start_date, end_date, description],
        };

        const result = await this.Pool.query(query);

        return result.rows[0].id;
    }

    async getAllExperience() {
        const query = {
            text: 'SELECT id, user_id, company, position, start_date, end_date, description FROM experience',
        };
        const result = await this.Pool.query(query);

        if (result.rows.length === 0) {
            throw new Error('No experience records found');
        }

        return result.rows;
    }

    async getExperienceById(id) {
        const query = {
            text: 'SELECT id, user_id, company, position, start_date, end_date, description FROM experience WHERE id = $1',
            values: [id],
        };

        const result = await this.Pool.query(query);

        if (result.rows.length === 0) {
            throw new Error('Experience not found');
        }

        return result.rows[0];
    }

    async updateExperience(id, {user_id, company, position, start_date, end_date, description}) {
        const existingExperience = await this.getExperienceById(id);

        if (!existingExperience) {
            throw new Error('Experience not found');
        }

        const query = {
            text: 'UPDATE experience SET user_id = $1, company = $2, position = $3, start_date = $4, end_date = $5, description = $6 WHERE id = $7',
            values: [user_id, company, position, start_date, end_date, description, id],
        };

        await this.Pool.query(query);
    }

    async deleteExperience(id) {
        const existingExperience = await this.getExperienceById(id);

        if (!existingExperience) {
            throw new Error('Experience not found');
        }

        const query = {
            text: 'DELETE FROM experience WHERE id = $1',
            values: [id],
        };

        await this.Pool.query(query);
    }

}

module.exports = {ExperienceService};