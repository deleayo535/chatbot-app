import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export let conn: Pool;

if (!conn) {
  conn = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DATABASE,
  });
}

export default conn ;