import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // Fase 0, Langkah 4: Konfigurasi .env
    ConfigModule.forRoot({
      isGlobal: true, // Membuat ConfigModule tersedia di semua module lain
      envFilePath: '.env', // Menunjukkan lokasi file .env
    }),

    // Fase 0, Langkah 4: Modul Prisma
    // Kita hapus TypeOrmModule dan ganti dengan PrismaModule
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}