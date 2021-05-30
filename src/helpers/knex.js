import Knex from "knex";
import { env } from "./env";

const knexStringcase = require("knex-stringcase");

export const instances = [];

export async function createTable(
  knex,
  tableName,
  tableBuilder,
  idColumnType,
) {
  await knex.schema.createTable(tableName, table => {
    table[idColumnType]("id").primary();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("deleted_at").defaultTo(null);
    tableBuilder(table);
  });
}

export async function dropTable(knex, tableName) {
  await knex.schema.dropTable(tableName);
}

export function getKnexInstance(databaseName) {
  const instance = Knex(
    knexStringcase({
      client: "pg",
      connection: {
        database: databaseName ?? env.DB_DATABASE,
        host: env.DB_HOST,
        password: env.DB_PASSWORD,
        port: parseInt(env.DB_PORT || "5432", 10),
        user: env.DB_USERNAME,
      },
      migrations: {
        directory: "src/migrations",
        extension: "js",
      },
    }),
  );

  instances.push(instance);

  return instance;
}
