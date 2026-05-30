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
    pgm.createTable('experience', {
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
        company: {
            type: 'varchar(255)',
            notNull: true
        },
        position: {
            type: 'varchar(255)',
            notNull: true
        },
        start_date: {
            type: 'date',
            notNull: true
        },
        end_date: {
            type: 'date',
            notNull: false
        },
        description: {
            type: 'text',
            notNull: false
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */ 
exports.down = (pgm) => {
    pgm.dropTable('experience');
};
