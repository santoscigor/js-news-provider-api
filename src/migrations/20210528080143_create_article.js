
exports.up = function(knex) {
    return knex.schema.createTable("articles", table => {
        table["uuid"]("id").primary();
        table.text("category");
        table.text("title");
        table.text("summary");
        table.text("firstParagraph");
        table.text("body");
        table.timestamps(true, true);

        table.uuid("author_id")
            .notNullable()
            .references("id")
            .inTable("authors")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("articles");
};
