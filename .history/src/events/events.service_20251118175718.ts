import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEventDto) {
    return this.prisma.event.create({ data: dto });
  }

  async findAll() {
    return this.prisma.event.findMany({
      orderBy: { date: 'asc' }, // Urutkan berdasarkan tanggal terdekat
    });
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) throw new NotFoundException('Event tidak ditemukan');
    return event;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.event.delete({ where: { id } });
  }
}
