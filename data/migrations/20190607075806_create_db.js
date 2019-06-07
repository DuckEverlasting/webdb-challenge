exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();
      tbl
        .string("name", 255)
        .notNullable()
        .unique();
      tbl.string("description", 255);
      tbl.boolean("completed");
    })
    .createTable("actions", tbl => {
      tbl.increments();
      tbl
        .string("description", 255)
        .notNullable()
        .unique();
      tbl.string("notes", 255);
      tbl.boolean("completed");
      tbl
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("projects")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("actions")
    .dropTableIfExists("projects");
};