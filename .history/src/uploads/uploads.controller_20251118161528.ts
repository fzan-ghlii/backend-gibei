import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
// --- TAMBAHAN UNTUK FIX ---
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
// ---------------------------

@ApiTags('Uploads (Khusus Admin)')
@Controller('uploads')
export class UploadsController {
  
  /**
   * Endpoint POST /api/v1/uploads
   * Menerima 1 file gambar, menyimpannya, dan mengembalikan URL-nya.
   * Hanya bisa diakses oleh Admin/MasterAdmin yang sudah login.
   */
  
  // --- PERBAIKAN DI SINI ---
  // Kita tambahkan RolesGuard dan @Roles
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles(Role.ADMIN, Role.MASTER_ADMIN)
  // -------------------------
  
  @ApiBearerAuth()
  @Post()
  @UseInterceptors(FileInterceptor('file')) // 'file' adalah key dari FormData
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('File tidak ter-upload.');
    }

    // Mengembalikan URL publik dari file yang di-upload
    // Contoh: http://localhost:3000/uploads/namafileacak.jpg
    // URL inilah yang akan Anda SIMPAN di database (cth: imageUrl di Article)
    return {
      url: `http://localhost:3000/uploads/${file.filename}`,
    };
  }
}
