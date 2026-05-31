const { Pool } = require('pg');
const { nanoid } = require('nanoid');

class ProfileService {
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

    async createProfile({ user_id, full_name, bio, location, social_links, headline }) {
        const id = `profile-${nanoid(16)}`;
        
        const existingUserQuery = {
            text: 'SELECT id FROM users WHERE id = $1',
            values: [user_id],
        };
        const existingUserResult = await this.Pool.query(existingUserQuery);
        if (existingUserResult.rowCount === 0) {
            throw new Error(`User with id ${user_id} not found`);
        }

        const query = {
            text: 'INSERT INTO profile (id, user_id, full_name, bio, location, social_links, headline) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [id, user_id, full_name, bio, location, social_links, headline],
        };

        const result = await this.Pool.query(query);

        return result.rows[0].id;
    }

    async getProfileByUserId(user_id) {
        const existingUserQuery = {
            text: 'SELECT id FROM users WHERE id = $1',
            values: [user_id],
        };
        const existingUserResult = await this.Pool.query(existingUserQuery);
        if (existingUserResult.rowCount === 0) {
            throw new Error(`User with id ${user_id} not found`);
        }

        const query = {
            text: 'SELECT id, user_id, full_name, bio, location, social_links, headline FROM profile WHERE user_id = $1',
            values: [user_id],
        };

        const result = await this.Pool.query(query);

        if (result.rowCount === 0) {
            throw new Error(`Profile for user with id ${user_id} not found`);
        }

        return result.rows[0];
    }

    async updateProfile(user_id, { full_name, bio, location, social_links, headline }) {
        const existingUserQuery = {
            text: 'SELECT id FROM users WHERE id = $1',
            values: [user_id],
        };
        const existingUserResult = await this.Pool.query(existingUserQuery);
        if (existingUserResult.rowCount === 0) {
            throw new Error(`User with id ${user_id} not found`);
        }

        const existingProfileQuery = {
            text: 'SELECT id FROM profile WHERE user_id = $1',
            values: [user_id],
        };
        const existingProfileResult = await this.Pool.query(existingProfileQuery);
        if (existingProfileResult.rowCount === 0) {
            throw new Error(`Profile for user with id ${user_id} not found`);
        }

        const query = {
            text: 'UPDATE profile SET full_name = $1, bio = $2, location = $3, social_links = $4, headline = $5 WHERE user_id = $6 RETURNING id',
            values: [full_name, bio, location, social_links, headline, user_id],
        };

        const result = await this.Pool.query(query);

        return result.rows[0].id;
    }

}

module.exports = { ProfileService };