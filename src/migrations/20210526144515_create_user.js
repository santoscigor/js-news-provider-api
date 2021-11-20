export function up(knex) {
    return knex.schema.createTable("users", table => {
        table["uuid"]("id").primary();
        table.boolean("is_admin").defaultTo("false").notNullable();
        table.text("username").notNullable();
        table.text("password").notNullable();
        table.timestamps(true, true);
    });
}

export function down(knex) {
    return knex.schema.dropTable("users");
}
