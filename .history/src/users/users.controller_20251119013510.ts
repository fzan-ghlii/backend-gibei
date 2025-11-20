/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Endpoint GET /api/v1/users/me
   * Ini adalah contoh rute yang dilindungi.
   * Hanya user yang sudah login (mengirimkan JWT) yang bisa mengakses.
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // Menandai di Swagger bahwa endpoint ini butuh Bearer Token
  @Get('me')
  getProfile(@Request() req) {
    // req.user berisi payload dari JWT yang sudah divalidasi
    // oleh JwtStrategy
    return this.usersService.findById(req.user.userId);
  }
}
