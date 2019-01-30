
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('meals', function(table) {
      table.increments('id').primary();
      table.integer('type');
      table.integer('date_id').unsigned()
      table.foreign('date_id')
        .references('dates.id');

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('meals'),
  ]);
}
