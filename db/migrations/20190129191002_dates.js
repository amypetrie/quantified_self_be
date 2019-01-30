
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('dates', function(table) {
      table.increments('id').primary();
      table.date('date');
      table.integer('calgoal');
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('dates')
  ]);
};
