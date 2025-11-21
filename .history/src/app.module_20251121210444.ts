import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { GalleryModule } from './gallery/gallery.module';
import { UploadsModule } from './uploads/uploads.module';
import { EventsModule } from './events/events.module';
import { SpmModule } from './spm/spm.module';
import { RegistrationsModule } from './registrations/registrations.module';

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

    AuthModule,

    UsersModule,

    ArticlesModule,

    GalleryModule,

    UploadsModule,

    EventsModule,

    SpmModule,

    RegistrationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
