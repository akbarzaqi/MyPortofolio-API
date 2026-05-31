const {Pool} = require('pg');
const {nanoid} = require('nanoid');

class CategoryService {
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

    async createCategory({name, slug}) {
        const id = `cat-${nanoid(16)}`;

        const query = {
            text: 'INSERT INTO categories (id, name, slug) VALUES ($1, $2, $3) RETURNING id',
            values: [id, name, slug],
        };

        const result = await this.Pool.query(query);

        return result.rows[0].id;
    }

    async getCategories() {

        console.log('getCategories called');
        const query = {
            text: 'SELECT id, name, slug FROM categories',
        };

        const result = await this.Pool.query(query);

        console.log('getCategories result.rows:', result.rows);

        return result.rows;
    }

    async getCategoryById(id) {
        const query = {
            text: 'SELECT id, name, slug FROM categories WHERE id = $1',
            values: [id],
        };

        const result = await this.Pool.query(query);

        if (result.rows.length === 0) {
            throw new Error('Category not found');
        }

        return result.rows[0];
    }

    async updateCategory(id, {name, slug}) {
        const existingCategory = await this.getCategoryById(id);

        if (!existingCategory) {
            throw new Error('Category not found');
        }

        const query = {
            text: 'UPDATE categories SET name = $1, slug = $2 WHERE id = $3 RETURNING id',
            values: [name, slug, id],
        };

        const result = await this.Pool.query(query);

        return result.rows[0].id;
    }

    async deleteCategory(id) {
        const existingCategory = await this.getCategoryById(id);

        if (!existingCategory) {
            throw new Error('Category not found');
        }

        const query = {
            text: 'DELETE FROM categories WHERE id = $1',
            values: [id],
        };

        await this.Pool.query(query);
    }
}

module.exports = { CategoryService };