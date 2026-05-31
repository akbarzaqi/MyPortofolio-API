const {nanoid} = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

async function seed() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL || `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST || 'localhost'}:${process.env.POSTGRES_PORT || 5432}/${process.env.POSTGRES_DB}`,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.DB_HOST || 'localhost',
        port: process.env.POSTGRES_PORT || 5432,
    });

    const client = await pool.connect();
    const dataAdmin = {
        id: `user-${nanoid(16)}`,
        name: 'Admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('123123', 10),
        role: 'admin',
    }
    try {

        const checkAdminQuery = {
            text: 'SELECT * FROM users WHERE email = $1',
            values: [dataAdmin.email],
        };
        const res = await client.query(checkAdminQuery);

        if (res.rows.length > 0) {
            console.log('Data admin sudah ada, tidak perlu ditambahkan');
            return;
        }

        const query = {
            text: 'INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5)',
            values: [dataAdmin.id, dataAdmin.name, dataAdmin.email, dataAdmin.password, dataAdmin.role],
        };
        await client.query(query);
        console.log('Data admin berhasil ditambahkan');
    } catch (error) {
        console.error('Gagal menambahkan data admin:', error);  
    } finally {
        client.release();
        pool.end();
    }
    
}

seed();