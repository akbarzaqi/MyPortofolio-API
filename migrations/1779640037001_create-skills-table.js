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
    pgm.createTable('skills', {
        id: {
            type: 'varchar(50)',
            primaryKey: true
        },
        user_id: {
            type: 'varchar(50)',
            notNull: true,
            references: 'users(id)',
            onDelete: 'CASCADE'
        },
        skill_name: {
            type: 'varchar(255)',
            notNull: true
        },
        proficiency_level: {
            type: 'varchar(255)',
            notNull: true
        },
        category: {
            type: 'varchar(255)',
            notNull: true
        }

    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('skills');
};
