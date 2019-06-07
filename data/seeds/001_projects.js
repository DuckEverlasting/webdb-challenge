
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {name: "My Great Project", description: "It is a project", completed: 1},
        {name: "My Other Great Project", completed: 0}
      ]);
    });
};
