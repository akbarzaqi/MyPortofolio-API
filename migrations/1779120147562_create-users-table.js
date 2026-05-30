/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable("users", {
        id: {
            type: "varchar(50)",
            primaryKey: true,
        },
        name: {
            type: "varchar(255)",
            notNull: true,
        },
        email: {
            type: "varchar(255)",
            notNull: true,
        },
        password: {
            type: "varchar(255)",
            notNull: true,
        },
        role: {
            type: "varchar(50)",
            notNull: true,
        },       
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable("users");
};
