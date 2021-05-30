
exports.up = function(knex) {
    return knex.schema.createTable("authors", table => {
        table["uuid"]("id").primary();
        table.text("name").notNullable();
        table.text("picture");
        table.timestamps(true, true);
        table.uuid("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
    });

};

exports.down = function(knex) {
    return knex.schema.dropTable("authors");
};
