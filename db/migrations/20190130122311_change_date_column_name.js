
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('dates', function(t) {
     t.renameColumn('date', 'current_date')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('dates', function(t) {
     t.renameColumn('current_date', 'date')
    })
  ])
};
