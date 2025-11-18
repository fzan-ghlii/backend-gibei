import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Membuat user baru (digunakan oleh AuthService.register)
   */
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        nama: createUserDto.nama,
        email: createUserDto.email,
        password: createUserDto.password, // Password sudah di-hash oleh AuthService
        role: createUserDto.role || Role.USER, // Default role USER
      },
    });
  }

  /**
   * Mencari user berdasarkan email (digunakan oleh AuthService.validateUser)
   */
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Mencari user berdasarkan ID (digunakan oleh JwtStrategy)
   */
  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
