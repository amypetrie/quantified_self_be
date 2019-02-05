
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('mealfoods', function(table) {
      table.increments('id').primary();
      table.integer('meal_id')
           .unsigned()
           .references('id')
           .inTable('meals')
           .onDelete('SET NULL');

      table.integer('food_id')
           .unsigned()
           .references('id')
           .inTable('foods')
           .onDelete('SET NULL');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('mealfoods'),
  ]);
}
