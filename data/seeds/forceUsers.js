
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('forceUsers').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('forceUsers').insert([
        { name: 'Luke Skywalker'},
        { name: 'Obi-Wan-Kenobi'},
        { name: 'Yoda'}
      ]);
    });
};
