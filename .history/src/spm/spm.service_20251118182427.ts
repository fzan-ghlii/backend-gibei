/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSpmDto } from './dto/create-spm.dto';

@Injectable()
export class SpmService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSpmDto) {
    return this.prisma.spm.create({ data: dto });
  }

  findAll() {
    return this.prisma.spm.findMany({
      orderBy: { schedule: 'asc' },
    });
  }

  async remove(id: number) {
    const spm = await this.prisma.spm.findUnique({ where: { id } });
    if (!spm) throw new NotFoundException('SPM tidak ditemukan');
    return this.prisma.spm.delete({ where: { id } });
  }
}
