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
    pgm.createTable("technology", {
        id: {
            type: "varchar(50)",
            primaryKey: true,
        },
        name: {
            type: "varchar(255)",
            notNull: true,
        },
        slug : {
            type: "varchar(255)",
            notNull: true,
            unique: true
        },
        tech_category: {
            type: "varchar(255)",
            notNull: true,
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable("technology");
};
