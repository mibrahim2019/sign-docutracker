/**
 * Debug script: test database connectivity using current env (.env + .env.local).
 * Run from repo root: npm run db:debug
 * With Supabase: put NEXT_PRIVATE_*_DATABASE_URL in .env.local and run again.
 */
import { config } from 'dotenv';
import path from 'path';

const root = path.resolve(process.cwd());
config({ path: path.join(root, '.env') });
config({ path: path.join(root, '.env.local'), override: true });

async function main() {
  const url = process.env.NEXT_PRIVATE_DATABASE_URL;
  if (!url) {
    console.error('Missing NEXT_PRIVATE_DATABASE_URL (set in .env or .env.local)');
    process.exit(1);
  }

  const redacted = url.replace(/:([^:@]+)@/, ':****@');
  console.log('Database URL (redacted):', redacted);

  const { getDatabaseUrl } = await import('../packages/prisma/helper');
  const { PrismaClient } = await import('@prisma/client');

  const effectiveUrl = getDatabaseUrl();
  if (effectiveUrl) {
    console.log('Effective URL (redacted):', effectiveUrl.replace(/:([^:@]+)@/, ':****@'));
  }

  // Test pooler URL (what the app uses at runtime)
  const poolerUrl = getDatabaseUrl();
  const prisma = new PrismaClient({ datasourceUrl: poolerUrl });

  try {
    await prisma.$connect();
    console.log('Database connection (pooler): OK');
  } catch (e) {
    console.error('Database connection (pooler): FAILED');
    console.error(e);
    // Also try direct URL in case only pooler auth is wrong
    const directUrl = process.env.NEXT_PRIVATE_DIRECT_DATABASE_URL;
    if (directUrl && directUrl !== poolerUrl) {
      console.log('\nTrying direct connection...');
      const directPrisma = new PrismaClient({ datasourceUrl: directUrl });
      try {
        await directPrisma.$connect();
        console.log('Database connection (direct): OK');
        await directPrisma.$disconnect();
      } catch (e2) {
        console.error('Database connection (direct): FAILED');
        console.error(e2);
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
