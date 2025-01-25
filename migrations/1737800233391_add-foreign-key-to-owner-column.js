/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.sql("INSERT INTO users(id, username, password, fullname) VALUES ('old_notes', 'old_notes', 'old_notes','old_notes')");
    // Membuat user baru
    pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner IS NULL");

    // Memberikan constraint foreign key pada owner terhadap kolom id dari tabel users
    pgm.addConstraint('notes', 'fk_notes.owner_users.id', 'FOREIGN Key(owner) REFERENCES users(id) ON DELETE CASCADE');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropConstraint('notes', 'fk_notes.owner_users.id');
     // mengubah nilai owner old_notes pada note menjadi NULL
  pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes'");
 
  // menghapus user baru.
  pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};
