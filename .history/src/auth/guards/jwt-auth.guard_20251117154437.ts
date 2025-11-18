import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard ini akan memicu 'jwt' strategy yang sudah kita buat
 * (jwt.strategy.ts)
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}