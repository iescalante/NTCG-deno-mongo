import {
  MongoClient,
  Database,
} from "https://deno.land/x/mongo@v0.28.1/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

let db: Database;

export async function connect() {
  const client = new MongoClient();
  // await client.connect(config().MONGODB_URI);
  await client.connect({
    db: config().MONGODB_DBNAME,
    tls: true,
    servers: [
      {
        host: config().MONGODB_HOST,
        port: 27017,
      },
    ],
    credential: {
      username: config().MONGODB_USER,
      password: config().MONGODB_PASSWORD,
      db: config().MONGODB_DBNAME,
      mechanism: "SCRAM-SHA-1",
    },
  });

  db = client.database("todos");
}

export function getDb() {
  return db;
}
