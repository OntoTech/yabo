import { IsNumberField } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class CreateAttributeDto {
  @ApiProperty()
  @IsObject()
  properties: JSON;

  @IsNumberField()
  type: number;
}
