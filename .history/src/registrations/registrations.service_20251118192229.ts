/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterSpmDto } from './dto/register-spm.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RegistrationsService {
  constructor(private prisma: PrismaService) {}

  // --- USER: DAFTAR EVENT ---
  async registerEvent(userId: number, eventId: number) {
    // Cek event ada atau tidak
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });
    if (!event) throw new NotFoundException('Event tidak ditemukan');

    // Cek sudah daftar atau belum
    const existing = await this.prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: { userId, eventId },
      },
    });
    if (existing)
      throw new ConflictException('Anda sudah terdaftar di event ini');

    return this.prisma.eventRegistration.create({
      data: { userId, eventId, status: 'PENDING' },
    });
  }

  // --- USER: DAFTAR SPM ---
  async registerSpm(userId: number, spmId: number, dto: RegisterSpmDto) {
    const spm = await this.prisma.spm.findUnique({ where: { id: spmId } });
    if (!spm) throw new NotFoundException('Jadwal SPM tidak ditemukan');

    const existing = await this.prisma.spmRegistration.findUnique({
      where: {
        userId_spmId: { userId, spmId },
      },
    });
    if (existing)
      throw new ConflictException('Anda sudah terdaftar di jadwal SPM ini');

    return this.prisma.spmRegistration.create({
      data: {
        userId,
        spmId,
        ...dto,
        status: 'PENDING',
      },
    });
  }

  // --- USER: LIHAT HISTORI PENDAFTARAN SAYA ---
  async findMyRegistrations(userId: number) {
    const events = await this.prisma.eventRegistration.findMany({
      where: { userId },
      include: { event: true },
    });
    const spm = await this.prisma.spmRegistration.findMany({
      where: { userId },
      include: { spm: true },
    });
    return { events, spm };
  }

  // --- ADMIN: LIHAT SEMUA PENDAFTAR (PER EVENT) ---
  async findByEvent(eventId: number) {
    return this.prisma.eventRegistration.findMany({
      where: { eventId },
      include: { user: { select: { nama: true, email: true } } },
    });
  }

  // --- ADMIN: UPDATE STATUS ---
  async updateStatusEvent(regId: number, status: Prisma.RegistrationStatus) {
    return this.prisma.eventRegistration.update({
      where: { id: regId },
      data: { status },
    });
  }
}
