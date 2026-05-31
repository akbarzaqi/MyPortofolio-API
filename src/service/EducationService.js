const { Pool } = require('pg');
const { nanoid } = require('nanoid');

class EducationService {
    constructor() {
        this.Pool = new Pool({
            connectionString: process.env.DATABASE_URL || `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST || 'localhost'}:${process.env.POSTGRES_PORT || 5432}/${process.env.POSTGRES_DB}`,
            ssl : {
                rejectUnauthorized: false
            },
            user: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            host: process.env.DB_HOST || 'localhost',
            port: process.env.POSTGRES_PORT || 5432,
        });
    }

    async createEducation({ institution, user_id, degree, field_of_study, start_date, end_date, description }) {
        const id = `edu-${nanoid(16)}`;

        const existingUserQuery = {
            text: 'SELECT id FROM users WHERE id = $1',
            values: [user_id],
        };

        const existingUserResult = await this.Pool.query(existingUserQuery);

        if (existingUserResult.rowCount === 0) {
            throw new Error(`User with id ${user_id} not found`);
        }

        const query = {
            text: 'INSERT INTO education (id, institution, user_id, degree, field_of_study, start_date, end_date, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
            values: [id, institution, user_id, degree, field_of_study, start_date, end_date, description],
        };

        const result = await this.Pool.query(query);

        return result.rows[0].id;
    }

    async getAllEducation() {
        const query = {
            text: 'SELECT id, institution, user_id, degree, field_of_study, start_date, end_date, description FROM education',
        };
        const result = await this.Pool.query(query);

        if (result.rows.length === 0) {
            throw new Error('No education records found');
        }

        return result.rows;
    }

    async getEducationById(id) {
        const query = {
            text: 'SELECT id, institution, user_id, degree, field_of_study, start_date, end_date, description FROM education WHERE id = $1',
            values: [id],
        };

        const result = await this.Pool.query(query);

        if (result.rows.length === 0) {
            throw new Error('Education record not found');
        }

        return result.rows[0];
    }

    async updateEducation(id, { institution, user_id, degree, field_of_study, start_date, end_date, description }) {
        const existingEducationQuery = {
            text: 'SELECT id FROM education WHERE id = $1',
            values: [id],
        };

        const existingEducationResult = await this.Pool.query(existingEducationQuery);

        if (existingEducationResult.rowCount === 0) {
            throw new Error(`Education record with id ${id} not found`);
        }

        const query = {
            text: 'UPDATE education SET institution = $1, user_id = $2, degree = $3, field_of_study = $4, start_date = $5, end_date = $6, description = $7 WHERE id = $8 RETURNING id',
            values: [institution, user_id, degree, field_of_study, start_date, end_date, description, id],
        };

        const result = await this.Pool.query(query);

        return result.rows[0].id;
    }

    async deleteEducation(id) {
        const existingEducationQuery = {
            text: 'SELECT id FROM education WHERE id = $1',
            values: [id],
        };

        const existingEducationResult = await this.Pool.query(existingEducationQuery);

        if (existingEducationResult.rowCount === 0) {
            throw new Error(`Education record with id ${id} not found`);
        }

        await this.Pool.query({
            text: 'DELETE FROM education WHERE id = $1',
            values: [id],
        });
    }
}

module.exports = { EducationService };