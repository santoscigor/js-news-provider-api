
export function up(knex) {
    return knex.schema.createTable("tokens", table => {
        table.increments();
        table.text("token").notNullable();
        table.boolean("is_valid").defaultTo("true").notNullable();
        table.uuid("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    });
}

export function down(knex) {
    return knex.schema.dropTable("tokens");
}
