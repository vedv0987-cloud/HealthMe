import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: InstanceType<typeof PrismaClient>;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ datasourceUrl: process.env.DATABASE_URL } as never);

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = prisma;

export default prisma;
