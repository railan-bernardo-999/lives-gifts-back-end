/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('email', 100).unique().notNullable();
    table.string('document', 255).unique().nullable();
    table.string('phone', 255).unique().nullable();
    table.string('password', 255).notNullable();
    table.string('birthday', 255).nullable();
    table.string('key_pix', 255).nullable();
    table.string('verify_email', 255).nullable();
    table.string('verify_phone', 255).nullable();
    table.string('two_factor', 255).nullable();
    table.timestamps(true, true); // created_at e updated_at automáticos
    
    // Índices para melhor performance
    table.index('email');
    table.index('document');
  });
};



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
