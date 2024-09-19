import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ZodExeceptionalFilter } from './common/filters/zod-exception.filter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const isPrismaConnect = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  } finally {
    await prisma.$disconnect();
  }
};

async function bootstrap() {
  dotenv.config();
  isPrismaConnect();

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ZodExeceptionalFilter());
  await app.listen(process.env.PORT_BE || 3000);
}
bootstrap();
