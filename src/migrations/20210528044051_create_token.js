
exports.up = function(knex, Promise) {
    return knex.schema.createTable("tokens", table => {
        table.increments();
        table.text("token").notNullable();
        table.boolean("is_valid").defaultTo("true").notNullable()
        table.uuid("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("tokens");
};
