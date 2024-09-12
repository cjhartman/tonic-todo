import { createPool } from "mysql2/promise";

const pool = createPool({
  user: "root",
  host: "localhost",
  password: "B0roUGh$fIuDS*n",
  database: "tonic",
});

export default pool;
