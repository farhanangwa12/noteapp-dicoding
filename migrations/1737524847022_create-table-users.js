/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */


/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {


    pgm.createTable('users', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        username: {
            type: 'VARCHAR(50)',
            unique: true,
            notNull: true
        },
        password: {
            type: 'TEXT',
            notNull: true
        },
        fullname: {
            type: 'VARCHAR(100)',  // Menambahkan panjang maksimal 100 karakter
            notNull: true           // Pastikan kolom fullName tidak kosong
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {

    pgm.dropTable('users');
};
