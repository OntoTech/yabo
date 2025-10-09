import { Module } from '@nestjs/common';
import { AttributeTypeService } from './attribute-type.service';
import { AttributeTypeController } from './attribute-type.controller';

@Module({
  controllers: [AttributeTypeController],
  providers: [AttributeTypeService],
})
export class AttributeTypeModule {}
