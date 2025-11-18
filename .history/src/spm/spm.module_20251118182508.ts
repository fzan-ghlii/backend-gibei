import { Module } from '@nestjs/common';
import { SpmService } from './spm.service';
import { SpmController } from './spm.controller';

@Module({
  controllers: [SpmController],
  providers: [SpmService],
})
export class SpmModule {}
