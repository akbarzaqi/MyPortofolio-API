const { Pool } = require("pg");
const { nanoid } = require("nanoid");

class TechnologyService {
    constructor() {
        this.Pool = new Pool({
            connectionString: process.env.DATABASE_URL || `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST || 'localhost'}:${process.env.POSTGRES_PORT || 5432}/${process.env.POSTGRES_DB}`,
            user: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            host: process.env.DB_HOST || 'localhost',
            port: process.env.POSTGRES_PORT || 5432,
        });
        
    }

    async createTechnology({ name, slug, tech_category }) {
        const id = `tech-${nanoid(16)}`;

        const query = {
            text: "INSERT INTO technology (id, name, slug, tech_category) VALUES ($1, $2, $3, $4) RETURNING id",
            values: [id, name, slug, tech_category],
        };

        const result = await this.Pool.query(query);

        return result.rows[0].id;
    }

    async getTechnology() {
        const query = {
            text: "SELECT id, name, slug, tech_category FROM technology",
        };

        const result = await this.Pool.query(query);

        return result.rows;
    }

    async getTechnologyById(id) {
        const query = {
            text: "SELECT id, name, slug, tech_category FROM technology WHERE id = $1",
            values: [id],
        };

        const result = await this.Pool.query(query);

        return result.rows[0];
    }

    async updateTechnology(id, { name, slug, tech_category }) {

        const existingTechnology = await this.getTechnologyById(id);

        if (!existingTechnology) {
            throw new Error("Technology not found");
        }

        const query = {
            text: "UPDATE technology SET name = $1, slug = $2, tech_category = $3 WHERE id = $4 RETURNING id",
            values: [name, slug, tech_category, id],
        };

        const result = await this.Pool.query(query);

        return result.rows[0].id;
    }

    async deleteTechnology(id) {
        const existingTechnology = await this.getTechnologyById(id);

        if (!existingTechnology) {
            throw new Error("Technology not found");
        }

        const query = {
            text: "DELETE FROM technology WHERE id = $1",
            values: [id],
        };

        await this.Pool.query(query);
        
    }
}

module.exports = { TechnologyService };