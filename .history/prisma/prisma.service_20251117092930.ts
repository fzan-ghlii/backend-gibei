import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // Otomatis connect saat modul diinisialisasi
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await this.$connect();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async enableShutdownHooks(app: INestApplication) {
    // Fungsi ini dipanggil di main.ts
    // untuk memastikan koneksi ditutup dgn benar
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
