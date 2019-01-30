exports.seed = function(knex, Promise) {
  // We must return a Promise from within our seed function
  // Without this initial `return` statement, the seed execution
  // will end before the asynchronous tasks have completed
  return knex('foods').del()
    // Now that we have a clean slate, we can re-insert our data
    .then(() => {
      return Promise.all([
        // Insert a single paper, return the paper ID, insert 2 footnotes
        knex('foods').insert([
          { name: 'Kiwi', calories: 45},
          { name: 'Filet Mignon', calories: 225},
          { name: 'Popcorn', calories: 100},
          { name: 'Lentils', calories: 80},
          { name: 'Corn Tortilla', calories: 25},
          { name: 'Guacamole', calories: 150},
          { name: 'Almonds', calories: 120}], 'id')
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
