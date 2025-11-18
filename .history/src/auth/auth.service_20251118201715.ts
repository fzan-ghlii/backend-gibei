/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Helper internal untuk memvalidasi kredensial user
   * Dipanggil oleh fungsi login()
   * @param email Email user
   * @param pass Password mentah (plain text)
   * @returns Data user jika valid, atau null jika tidak
   */
  private async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    // Cek apakah user ada DAN password-nya cocok (menggunakan bcrypt.compare)
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user; // Hapus password dari objek balasan
      return result;
    }
    return null;
  }

  /**
   * Helper internal untuk membuat JWT
   * @param user Objek user (minimal harus ada id, email, dan role)
   * @returns Objek berisi access_token
   */
  private async _createToken(user: { id: number; email: string; role: Role }) {
    const payload = {
      sub: user.id, // 'sub' (subject) adalah standar JWT untuk user ID
      email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Logika LOGIN
   * Endpoint: POST /api/v1/auth/login
   */
  async login(loginUserDto: LoginUserDto) {
    // 1. Validasi user menggunakan helper
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );

    // 2. Jika validasi gagal (user tidak ada atau password salah)
    if (!user) {
      throw new UnauthorizedException('Email atau password salah.');
    }

    // 3. User valid, buatkan dan kembalikan JWT
    return this._createToken(user);
  }

  /**
   * Logika REGISTER
   * Endpoint: POST /api/v1/auth/register
   */
  async register(registerUserDto: RegisterUserDto) {
    // 1. Cek apakah user dengan email ini sudah ada
    const existingUser = await this.usersService.findByEmail(
      registerUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email ini sudah terdaftar.');
    }

    // 2. Hash password-nya (jangan pernah simpan password plain text)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerUserDto.password, salt);

    // 3. Buat user baru di database melalui UsersService
    const newUser = await this.usersService.create({
      ...registerUserDto,
      password: hashedPassword, // Kirim password yang sudah di-hash
      role: Role.USER, // Paksa role sebagai USER saat registrasi publik
    });

    // 4. Kembalikan data user baru (tanpa password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser;
    return result;
  }
}
