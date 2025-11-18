import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  // --- UNTUK ADMIN ---

  create(createGalleryItemDto: CreateGalleryItemDto) {
    return this.prisma.galleryItem.create({
      data: createGalleryItemDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Cek apakah item ada
    return this.prisma.galleryItem.delete({
      where: { id },
    });
  }

  // --- UNTUK PUBLIK ---

  findAll() {
    return this.prisma.galleryItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Helper untuk cek
  private async findOne(id: number) {
    const item = await this.prisma.galleryItem.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item galeri dengan ID ${id} tidak ditemukan.`);
    }
    return item;
  }
}