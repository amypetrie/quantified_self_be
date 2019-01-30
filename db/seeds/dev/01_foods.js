exports.seed = function(knex, Promise) {
  // return knex('foods').del()
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')

    .then(() => {
      return Promise.all([
        knex('foods').insert([
          { name: 'Kiwi', calories: 45},
          { name: 'Filet Mignon', calories: 225},
          { name: 'Popcorn', calories: 100},
          { name: 'Lentils', calories: 80},
          { name: 'Corn Tortilla', calories: 25},
          { name: 'Guacamole', calories: 150},
          { name: 'Cereal', calories: 110},
          { name: 'Wedge Salad', calories: 200},
          { name: 'Bacon', calories: 60},
          { name: 'Eggs', calories: 170},
          { name: 'Cheese', calories: 80},
          { name: 'Almonds', calories: 120}], 'id')
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
