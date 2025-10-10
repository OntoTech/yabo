import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAttributeTypeDto {
  @ApiProperty()
  @IsString()
  name: string;
}
