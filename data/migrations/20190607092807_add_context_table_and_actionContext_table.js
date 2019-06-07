exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("contexts", tbl => {
      tbl.increments();
      tbl
        .string("name", 255)
        .notNullable()
        .unique();
    })
    .createTable("actions_in_context", tbl => {
      tbl
        .integer("action_id")
        .unsigned()
        .references("id")
        .inTable("actions")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("context_id")
        .unsigned()
        .references("id")
        .inTable("contexts")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl.primary(["action_id", "context_id"]);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("actions_in_context")
    .dropTableIfExists("contexts");
};