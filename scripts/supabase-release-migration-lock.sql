-- Run this in Supabase SQL Editor if "advisory lock" timeout blocks prisma migrate deploy.
-- It terminates idle connections holding Prisma's migration lock (objid 72707369).
SELECT pg_terminate_backend(psa.pid)
FROM pg_locks AS pl
JOIN pg_stat_activity AS psa ON psa.pid = pl.pid
WHERE psa.state = 'idle'
  AND pl.objid = 72707369;
