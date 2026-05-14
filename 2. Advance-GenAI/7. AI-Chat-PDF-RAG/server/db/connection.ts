import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const pool = new Pool();

const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

export async function ConnectDB() {
    if (!process.env.DATABASE_URL) {
        console.error("DATABASE_URL is not defined");
        return;
    }
    try {
        await prisma.$connect();
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database', error);
    }
}