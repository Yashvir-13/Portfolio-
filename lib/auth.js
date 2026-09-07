import { getDb } from './db/index.js';
import bcrypt from 'bcryptjs';

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

/**
 * Checks if the IP is currently rate-limited.
 */
export async function checkRateLimit(ip) {
  const sql = getDb();
  
  // Cleanup old attempts (older than our lockout window)
  await sql`
    DELETE FROM login_attempts 
    WHERE attempted_at < NOW() - interval '1 minute' * ${LOCKOUT_MINUTES}
  `;

  // Count recent failed attempts
  const rows = await sql`
    SELECT COUNT(*) as count 
    FROM login_attempts 
    WHERE ip_address = ${ip} AND success = false
  `;
  
  return parseInt(rows[0].count, 10) >= MAX_ATTEMPTS;
}

/**
 * Logs a login attempt.
 */
export async function logAttempt(ip, success) {
  const sql = getDb();
  await sql`
    INSERT INTO login_attempts (ip_address, success)
    VALUES (${ip}, ${success})
  `;
}

/**
 * Verifies the master password against the hash.
 * You should set ADMIN_PASSWORD_HASH in .env.local
 * Example generating a hash: 
 *   const bcrypt = require('bcryptjs'); 
 *   console.log(bcrypt.hashSync('your_password', 10));
 */
export async function verifyPassword(password) {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    console.warn("ADMIN_PASSWORD_HASH is not set. Login is disabled.");
    return false;
  }
  return bcrypt.compare(password, hash);
}
