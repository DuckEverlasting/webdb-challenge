exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("actions")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("actions").insert([
        {
          description: "Need to send out flyers.",
          notes: "How will people know about this wonderful project if we don't send out flyers, I ask you? They won't. This is unacceptable.",
          completed: 1,
          project_id: 1
        },
        {
          description: "Need to finish building the project.",
          notes: "I suppose we should also build the actual project. Engineers have been on my back about this one. Can't they see I'm busy with FLYERS?!?!?!",
          completed: 1,
          project_id: 1
        },
        {
          description: "Need to make the project.",
          notes: "Haven't started. Hope this isn't a problem.",
          completed: 0,
          project_id: 2
        }
      ]);
    });
};
