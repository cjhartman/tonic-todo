import knex from "knex";

const db = knex({
  client: "mysql2",
  connection: {
    user: "root",
    host: "localhost",
    password: "B0roUGh$fIuDS*n",
    database: "tonic",
  },
  pool: { min: 0, max: 7 },
});

export default db;
