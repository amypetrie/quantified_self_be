exports.seed = function(knex, Promise) {
  // We must return a Promise from within our seed function
  // Without this initial `return` statement, the seed execution
  // will end before the asynchronous tasks have completed
  return knex('dates').del()
    // Now that we have a clean slate, we can re-insert our data
    .then(() => {
      return Promise.all([
        // Insert a single paper, return the paper ID, insert 2 footnotes
        knex('dates').insert([
          { current_date: new Date('February 1 2019'), calgoal: 2000},
          { current_date: new Date('February 2 2019'), calgoal: 1800},
          { current_date: new Date('February 3 2019'), calgoal: 2000},
          { current_date: new Date('February 4 2019'), calgoal: 1750}], 'id')
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
