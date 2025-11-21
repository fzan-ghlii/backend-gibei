// --- TAMBAHAN UNTUK FIX ---
// Impor 'config' dari dotenv di baris paling atas
import { config } from 'dotenv';
// Panggil config() segera
// Ini akan memuat file .env ke process.env secara manual
config();
// -------------------------

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { join } from 'path';
import type { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Fase 0, Langkah 5: Aktifkan CORS
  app.enableCors({
    origin: ['http://localhost:5173', 
      
    ], // Sesuaikan dengan port FE Vue Anda
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // (Opsional tapi disarankan) Aktifkan validasi DTO secara global
  app.useGlobalPipes(new ValidationPipe());

  // (Opsional tapi disarankan) Tambahkan prefix global untuk semua API
  app.setGlobalPrefix('api/v1');
  app.useStaticAssets(join(process.cwd(), 'public'), {
    prefix: '/', // Ini membuat file diakses langsung dari root (cth: /uploads/gambar.png)
  });
  // Fase 0 (Prisma): Aktifkan shutdown hooks
  // Ini memastikan Prisma menutup koneksi dgn benar saat app dimatikan
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000); // Backend akan berjalan di http://localhost:3000
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
