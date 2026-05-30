const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");

class UsersService {
    constructor() {
        this.Pool = new Pool({
            user: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            host: process.env.DB_HOST || "localhost",
            port: 5432,
        });
    }

    async createUser({ name, email, password, role = "user" }) {
        const id = `user-${nanoid(16)}`;
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = {
            text: "INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            values: [id, name, email, hashedPassword, role],
        };

        const result = await this.Pool.query(query);

        return result.rows[0].id;
    }

    async verifyUserCredentials(email, password) {
        const query = {
            text: "SELECT id, password FROM users WHERE email = $1",
            values: [email],
        };

        const result = await this.Pool.query(query);
        const user = result.rows[0];

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        return user.id;
    }

    async getUserById(id) {
        const query = {
            text: "SELECT role FROM users WHERE id = $1",
            values: [id],
        };

        const result = await this.Pool.query(query);
        return result.rows[0];
    }
}

module.exports = { UsersService };