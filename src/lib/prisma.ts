import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Mock client for build phase - returns empty arrays for any query
const buildMock = new Proxy({}, {
  get: () => new Proxy({}, { get: () => async () => [] })
}) as unknown as PrismaClient;

const isBuildPhase = process.env.npm_lifecycle_event === 'build';

export const prisma =
  globalForPrisma.prisma ||
  (isBuildPhase
    ? buildMock
    : new PrismaClient({
        datasources: {
          db: {
            url: "postgresql://postgres.mjlekzcrwerjdqbhozkd:Akooww1233%40@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres?connection_limit=1"
          }
        }
      }));

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

