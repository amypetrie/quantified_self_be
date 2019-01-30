exports.seed = function(knex, Promise) {
  // return knex('meals').del();
  return knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE')

  .then(() => {
    return Promise.all([
        knex('meals').insert([
          {type: 1, date_id: 1 },
          {type: 2, date_id: 1 },
          {type: 3, date_id: 1 },
          {type: 4, date_id: 1 },
          {type: 1, date_id: 2 },
          {type: 2, date_id: 2 },
          {type: 3, date_id: 2 },
          {type: 4, date_id: 2 },
          {type: 1, date_id: 3 },
          {type: 2, date_id: 3 },
          {type: 3, date_id: 3 },
          {type: 4, date_id: 3 }], 'id')
      .then(() => console.log('Seeding complete!'))
      .catch(error => console.log(`Error seeding data: ${error}`))
    ]) // end return Promise.all
  })
  .catch(error => console.log(`Error seeding data: ${error}`));
};
