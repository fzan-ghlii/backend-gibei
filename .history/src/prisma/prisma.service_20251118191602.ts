import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  event: any;
  spm: any;
    eventRegistration: any;
    spmRegistration: any;
  async onModuleInit() {
    // Otomatis connect saat modul diinisialisasi

    await this.$connect();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async enableShutdownHooks(app: INestApplication) {
    // Fungsi ini dipanggil di main.ts
    // untuk memastikan koneksi ditutup dgn benar
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
