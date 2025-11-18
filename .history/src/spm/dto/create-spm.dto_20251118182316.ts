import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateSpmDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'SPM Level 1' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  schedule: Date;

  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 100 })
  quota: number;
}