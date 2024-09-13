import knex from "knex";

/* 
  if you were to have a local mysql instance running, you could 
  create a "tonic" db. Then run this statement.

  CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completedAt DATETIME DEFAULT NULL,
    deletedAt DATETIME DEFAULT NULL
  );

  I could have used prisma or some ORM and then had a migration to help setup, but this is supposed to be simple
*/

const db = knex({
  client: "mysql2",
  connection: {
    user: "root",
    host: "localhost",
    password: "your-db-password",
    database: "tonic",
  },
  pool: { min: 0, max: 7 },
});

export default db;
