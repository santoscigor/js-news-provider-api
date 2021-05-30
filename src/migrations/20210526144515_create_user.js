exports.up = function(knex, Promise) {
    return knex.schema.createTable("users", table => {
        table["uuid"]("id").primary();
        table.boolean("is_admin").defaultTo("false").notNullable()
        table.text("username").notNullable();
        table.text("password").notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("users");
};
