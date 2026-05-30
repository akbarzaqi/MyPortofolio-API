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
    pgm.createTable("projects_categories", {
        project_id: {
            type: "varchar(50)",
            notNull: true,
            references: "projects",
            onDelete: "cascade",
        },
        category_id: {
            type: "varchar(50)",
            notNull: true,
            references: "categories",
            onDelete: "cascade",
        },
        
        
    },
    {
        constraints: {
            primaryKey: ["project_id", "category_id"],
        }
    }); 
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable("projects_categories");
};
