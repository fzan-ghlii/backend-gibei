import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class RegisterSpmDto {
  
  @ApiProperty({ example: '812345678', description: 'NIM Mahasiswa atau NIK Umum' })
  @IsString()
  @IsNotEmpty()
  nim: string;

  @ApiProperty({ example: 'Fakultas Ekonomi (UNIMED)' })
  @IsString()
  @IsNotEmpty()
  origin: string;

  @ApiProperty({ example: '081234567890' })
  @IsString()
  @IsNotEmpty()
  phone: string;
}