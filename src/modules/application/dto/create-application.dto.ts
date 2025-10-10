import { IsNumberField, IsStringField } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { number } from 'joi';

export class CreateApplicationDto {
  @IsStringField()
  name!: string;

  @IsStringField()
  description: string;

  @IsNotEmpty()
  @ApiProperty({ type: number, required: true })
  type: number;

  @IsNumberField({ each: true, required: false })
  children?: Array<number>;

  @IsNumberField({ each: true, required: false })
  attributes?: Array<number>;
}
