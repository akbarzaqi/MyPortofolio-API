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
    pgm.createTable("projects", {
        id:{
            type: "varchar(50)",
            primaryKey: true,
        },
        title:{
            type: "varchar(255)",
            notNull: true,
        },
        slug: {
            type: "varchar(255)",
            notNull: true,
            unique: true,
        },
        description:{
            type: "text",
            notNull: true,
        },
        status: {
            type: "varchar(50)",
            notNull: true,
        },
        is_featured: {
            type: "boolean",
            notNull: true,
            default: false,
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable("projects");
};
