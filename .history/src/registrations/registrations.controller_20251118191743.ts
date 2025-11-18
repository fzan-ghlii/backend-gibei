/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { RegisterSpmDto } from './dto/register-spm.dto';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role, RegistrationStatus } from '@prisma/client';

@ApiTags('Registrations')
@Controller('registrations')
@UseGuards(JwtAuthGuard) // Semua endpoint butuh login
@ApiBearerAuth()
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  // =======================
  // == USER ENDPOINTS ==
  // =======================

  @Post('event/:eventId')
  registerEvent(@Param('eventId', ParseIntPipe) eventId: number, @Request() req) {
    return this.registrationsService.registerEvent(req.user.userId, eventId);
  }

  @Post('spm/:spmId')
  registerSpm(
    @Param('spmId', ParseIntPipe) spmId: number,
    @Body() dto: RegisterSpmDto,
    @Request() req,
  ) {
    return this.registrationsService.registerSpm(req.user.userId, spmId, dto);
  }

  @Get('me')
  findMyRegistrations(@Request() req) {
    return this.registrationsService.findMyRegistrations(req.user.userId);
  }

  // =======================
  // == ADMIN ENDPOINTS ==
  // =======================

  @Get('admin/event/:eventId')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER_ADMIN)
  findEventRegistrants(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.registrationsService.findByEvent(eventId);
  }

  @Patch('admin/event/:regId/status')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER_ADMIN)
  @ApiBody({ schema: { example: { status: 'APPROVED' } } })
  updateEventStatus(
    @Param('regId', ParseIntPipe) regId: number,
    @Body('status') status: RegistrationStatus,
  ) {
    return this.registrationsService.updateStatusEvent(regId, status);
  }
}
