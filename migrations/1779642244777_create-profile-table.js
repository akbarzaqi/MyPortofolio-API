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
    pgm.createTable('profile', {
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
        full_name: {
            type: 'varchar(255)',
            notNull: true
        },
        bio: {
            type: 'text',
            notNull: false
        },
        location: {
            type: 'varchar(255)',
            notNull: false
        },
        social_links: {
            type: 'jsonb',
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
    pgm.dropTable('profile');
};
