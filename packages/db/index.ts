// src/db/prisma.ts
import { PrismaClient } from './generated/prisma/client';

declare global {
  // for Next.js hot reload
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

function createPrismaClient() {
  // cast to any to bypass the bad type
  return new PrismaClient({} as any);
}

export const prisma = global.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
