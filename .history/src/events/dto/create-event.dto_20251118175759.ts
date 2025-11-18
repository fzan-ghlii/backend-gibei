import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @Type(() => Date) // Konversi string ISO8601 ke Date object
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ example: '2025-12-20T09:00:00Z' })
  date: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  location: string;

  @IsUrl({ require_tld: false })
  @IsNotEmpty()
  @ApiProperty()
  imageUrl: string;
}
