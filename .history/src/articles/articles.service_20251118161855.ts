import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  // --- UNTUK ADMIN ---

  async create(createArticleDto: CreateArticleDto, authorId: number) {
    return this.prisma.article.create({
      data: {
        ...createArticleDto,
        author: {
          connect: { id: authorId }, // Hubungkan dengan author
        },
      },
    });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    await this.findOne(id); // Cek apakah artikel ada
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Cek apakah artikel ada
    return this.prisma.article.delete({
      where: { id },
    });
  }

  // --- UNTUK PUBLIK ---

  async findAll() {
    return this.prisma.article.findMany({
      orderBy: { createdAt: 'desc' }, // Tampilkan yang terbaru dulu
      include: {
        author: {
          select: { nama: true }, // Hanya ambil nama author
        },
      },
    });
  }

  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: {
        author: {
          select: { nama: true },
        },
      },
    });
    if (!article) {
      throw new NotFoundException(`Artikel dengan ID ${id} tidak ditemukan.`);
    }
    return article;
  }
}
