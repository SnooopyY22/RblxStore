import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Prevent Prisma from connecting during Vercel build phase
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build' || process.env.CI === '1' || process.env.npm_lifecycle_event === 'build';

// Mock client that returns empty arrays for any query during build
const mockPrisma = new Proxy({}, {
  get: () => new Proxy({}, {
    get: () => async () => []
  })
}) as unknown as PrismaClient;

export const prisma =
  globalForPrisma.prisma ||
  (isBuildPhase ? mockPrisma : new PrismaClient());

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
