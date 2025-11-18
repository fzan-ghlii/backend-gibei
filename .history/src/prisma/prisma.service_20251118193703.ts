/* eslint-disable @typescript-eslint/require-await */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';

@Injectable()
// Kita mewarisi (extends) PrismaClient, jadi semua properti model (user, event, spm, dll)
// SUDAH OTOMATIS TERSEDIA. Tidak perlu ditulis ulang.
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}