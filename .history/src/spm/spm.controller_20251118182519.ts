import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { SpmService } from './spm.service';
import { CreateSpmDto } from './dto/create-spm.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('SPM')
@Controller('spm')
export class SpmController {
  constructor(private readonly spmService: SpmService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER_ADMIN)
  @ApiBearerAuth()
  create(@Body() createSpmDto: CreateSpmDto) {
    return this.spmService.create(createSpmDto);
  }

  @Get()
  findAll() {
    return this.spmService.findAll();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER_ADMIN)
  @ApiBearerAuth()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.spmService.remove(id);
  }
}
