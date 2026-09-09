import { getDb } from './lib/db/index.js';

async function run() {
  const sql = getDb();
  try {
    const rows = await sql`SELECT * FROM external_sources`;
    console.log(JSON.stringify(rows, null, 2));
  } catch (e) {
    console.error(e);
  }
  process.exit(0);
}
run();
