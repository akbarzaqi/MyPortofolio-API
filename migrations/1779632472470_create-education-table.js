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
    pgm.createTable('education', {
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
        institution: {
            type: 'varchar(255)',
            notNull: true
        },
        degree: {
            type: 'varchar(255)',
            notNull: true
        },
        field_of_study: {
            type: 'varchar(255)',
            notNull: true
        },
        start_date: {
            type: 'date',
            notNull: true
        },
        end_date: {
            type: 'date',
            notNull: true
        },

    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('education');
};
