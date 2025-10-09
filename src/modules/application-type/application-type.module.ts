import { Module } from '@nestjs/common';
import { ApplicationTypeService } from './application-type.service';
import { ApplicationTypeController } from './application-type.controller';

@Module({
  controllers: [ApplicationTypeController],
  providers: [ApplicationTypeService],
})
export class ApplicationTypeModule {}
