import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';

// UpdateArticleDto akan memiliki semua properti dari CreateArticleDto,
// tapi semuanya bersifat opsional.
export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
