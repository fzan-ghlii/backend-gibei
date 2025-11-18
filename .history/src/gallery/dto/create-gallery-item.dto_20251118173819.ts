import { ApiProperty } from '@nestjs/swagger';
import { GalleryCategory } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateGalleryItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsEnum(GalleryCategory)
  @IsNotEmpty()
  @ApiProperty({ enum: GalleryCategory, example: 'FOTO' })
  category: GalleryCategory;

 @IsUrl({ require_tld: false })
  @IsNotEmpty()
  @ApiProperty({ description: 'URL gambar/thumbnail dari POST /uploads' })
  imageUrl: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    description: 'URL video (cth: Youtube Embed), kosongkan jika kategori FOTO',
    required: false,
  })
  videoUrl?: string;
}
