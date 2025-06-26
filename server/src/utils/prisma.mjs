// src/utils/prisma.mjs
import { PrismaClient } from '@prisma/client';

let prisma;

try {
  prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
  
  // Test the connection
  await prisma.$connect();
  console.log('Prisma connected successfully');
} catch (error) {
  console.error('Failed to initialize Prisma:', error);
  
  // Try to generate and reconnect
  try {
    const { execSync } = await import('child_process');
    console.log('Attempting to generate Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
    
    await prisma.$connect();
    console.log('Prisma reconnected after generation');
  } catch (retryError) {
    console.error('Failed to recover Prisma connection:', retryError);
    throw retryError;
  }
}

export { prisma };