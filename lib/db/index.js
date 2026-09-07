import { neon } from '@neondatabase/serverless';

// All secrets are server-only. This module is ONLY imported in:
// - Server Components
// - Server Actions
// - API Route handlers
// - Seed/migration scripts
// Cache the SQL client so we don't re-initialize the Neon HTTP client on every query
// This vastly improves rendering speed and prevents UND_ERR_CONNECT_TIMEOUT in development.
let sql;

export function getDb() {
  if (sql) return sql;
  
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL environment variable is not set. ' +
      'Add it to your .env.local file or Vercel environment variables.'
    );
  }
  
  sql = neon(databaseUrl);
  return sql;
}
