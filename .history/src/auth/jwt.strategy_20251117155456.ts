import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    // --- PERBAIKAN DIMULAI DI SINI ---
    // 1. Ambil secret key DARI LUAR super()
    const secret = configService.get<string>('JWT_SECRET');

    // 2. Beri error jika key tidak ada di .env
    if (!secret) {
      // eslint-disable-next-line prettier/prettier
      throw new Error(
        'FATAL ERROR: JWT_SECRET tidak ditemukan di file .env',
      );
    }
    // --- PERBAIKAN SELESAI ---

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, // 3. Gunakan variabel 'secret' yang sudah divalidasi
    });
  }

  /**
   * Fungsi ini akan dipanggil oleh Passport setiap kali
   * sebuah rute yang dilindungi (diberi @UseGuards(JwtAuthGuard)) diakses.
   */
  async validate(payload: any) {
    // Cek apakah user di dalam token masih ada di database
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User tidak ditemukan.');
    }

    // Payload yang di-return di sini akan disisipkan
    // ke dalam object `req.user` di controller
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
