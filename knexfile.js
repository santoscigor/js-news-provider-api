import knexStringcase from "knex-stringcase";

export const development = knexStringcase({
    client: "postgresql",
    connection: {
        database: "challenge",
        password: "postgres",
        user: "postgres",
    },
    migrations: {
        directory: "src/migrations",
        extension: "js",
    },
});
