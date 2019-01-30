exports.seed = function(knex, Promise) {
  // return knex('dates').del();
  return knex.raw('TRUNCATE dates RESTART IDENTITY CASCADE')

  .then(() => {
    return Promise.all([
        knex('dates').insert([
          { current_date: new Date('February 1 2019'), calgoal: 2000},
          { current_date: new Date('February 2 2019'), calgoal: 1800},
          { current_date: new Date('February 3 2019'), calgoal: 2000}], 'id')
      .then(() => console.log('Seeding complete!'))
      .catch(error => console.log(`Error seeding data: ${error}`))
    ]) // end return Promise.all
  })
  .catch(error => console.log(`Error seeding data: ${error}`));
};
