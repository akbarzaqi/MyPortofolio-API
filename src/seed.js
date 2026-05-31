const {nanoid} = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

async function seed() {
    const pool = new Pool({
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.DB_HOST || 'localhost',
        port: 5432,
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