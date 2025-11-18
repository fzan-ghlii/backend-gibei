/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Ambil data roles yang diizinkan dari @Roles() decorator
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Jika tidak ada @Roles() decorator, izinkan akses (anggap publik/hanya butuh login)
    if (!requiredRoles) {
      return true;
    }

    // Ambil data user dari request (yang sudah diisi oleh JwtAuthGuard)
    const { user } = context.switchToHttp().getRequest();

    // Cek apakah role user ada di dalam daftar roles yang diizinkan
    return requiredRoles.some((role) => user.role === role);
  }
}
