import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterSpmDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nim: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Fakultas Ekonomi (UNIMED)' })
  origin: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;
}
