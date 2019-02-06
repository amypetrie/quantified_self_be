exports.seed = function(knex, Promise) {
  // return knex('meals').del();
  return knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE')

  .then(() => {
    return Promise.all([
        knex('meals').insert([
          {type: 1 },
          {type: 2 },
          {type: 3 },
          {type: 4 },
          {type: 1 },
          {type: 2 },
          {type: 3 },
          {type: 4 },
          {type: 1 },
          {type: 2 },
          {type: 3 },
          {type: 4 }], 'id')
      .then(() => console.log('Seeding complete!'))
      .catch(error => console.log(`Error seeding data: ${error}`))
    ]) // end return Promise.all
  })
  .catch(error => console.log(`Error seeding data: ${error}`));
};
