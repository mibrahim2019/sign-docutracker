/// <reference types="@docutracker/tsconfig/process-env.d.ts" />

export const getDatabaseUrl = () => {
  if (process.env.NEXT_PRIVATE_DATABASE_URL) {
    return process.env.NEXT_PRIVATE_DATABASE_URL;
  }

  if (process.env.POSTGRES_URL) {
    process.env.NEXT_PRIVATE_DATABASE_URL = process.env.POSTGRES_URL;
    process.env.NEXT_PRIVATE_DIRECT_DATABASE_URL = process.env.POSTGRES_URL;
  }

  if (process.env.DATABASE_URL) {
    process.env.NEXT_PRIVATE_DATABASE_URL = process.env.DATABASE_URL;
    process.env.NEXT_PRIVATE_DIRECT_DATABASE_URL = process.env.DATABASE_URL;
  }

  if (process.env.DATABASE_URL_UNPOOLED) {
    process.env.NEXT_PRIVATE_DIRECT_DATABASE_URL = process.env.DATABASE_URL_UNPOOLED;
  }

  if (process.env.POSTGRES_PRISMA_URL) {
    process.env.NEXT_PRIVATE_DATABASE_URL = process.env.POSTGRES_PRISMA_URL;
  }

  if (process.env.POSTGRES_URL_NON_POOLING) {
    process.env.NEXT_PRIVATE_DIRECT_DATABASE_URL = process.env.POSTGRES_URL_NON_POOLING;
  }

  // If we don't have a database URL, we can't normalize it.
  if (!process.env.NEXT_PRIVATE_DATABASE_URL) {
    return undefined;
  }

  const normalizeForUrl = (u: string) =>
    u.replace('postgres://', 'https://').replace('postgresql://', 'https://');
  const toPostgres = (u: URL) => u.toString().replace('https://', 'postgres://');

  // Supabase (and other cloud Postgres) require SSL from external platforms (e.g. Railway).
  const primaryUrl = new URL(normalizeForUrl(process.env.NEXT_PRIVATE_DATABASE_URL));
  if (primaryUrl.hostname.includes('supabase.com') && !primaryUrl.searchParams.has('sslmode')) {
    primaryUrl.searchParams.set('sslmode', 'require');
    process.env.NEXT_PRIVATE_DATABASE_URL = toPostgres(primaryUrl);
  }
  if (process.env.NEXT_PRIVATE_DIRECT_DATABASE_URL) {
    const directUrl = new URL(normalizeForUrl(process.env.NEXT_PRIVATE_DIRECT_DATABASE_URL));
    if (directUrl.hostname.includes('supabase.com') && !directUrl.searchParams.has('sslmode')) {
      directUrl.searchParams.set('sslmode', 'require');
      process.env.NEXT_PRIVATE_DIRECT_DATABASE_URL = toPostgres(directUrl);
    }
  }

  // We change the protocol from `postgres:` to `https:` so we can construct a easily
  // mofifiable URL.
  const url = new URL(normalizeForUrl(process.env.NEXT_PRIVATE_DATABASE_URL));

  // If we're using a connection pool, we need to let Prisma know that
  // we're using PgBouncer.
  if (process.env.NEXT_PRIVATE_DATABASE_URL !== process.env.NEXT_PRIVATE_DIRECT_DATABASE_URL) {
    url.searchParams.set('pgbouncer', 'true');

    process.env.NEXT_PRIVATE_DATABASE_URL = toPostgres(url);
  }

  return process.env.NEXT_PRIVATE_DATABASE_URL;
};
