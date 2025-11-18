import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: 'URL gambar yang didapat dari POST /uploads' })
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  category: string;
}