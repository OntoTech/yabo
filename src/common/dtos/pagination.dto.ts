import { IsDateField, ToArray } from '@common/decorators';
import { IsBooleanField } from '@common/decorators/validation/is-boolean-field.decorator';
import { IsStringField } from '@common/decorators/validation/is-string-field.decorator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export abstract class PaginationDto {
  @IsDateField({ required: false, greaterThan: true })
  from?: Date;

  @IsOptional()
  @IsDateField()
  to?: Date;

  @ApiPropertyOptional({ default: '', description: 'Search query' })
  @IsStringField({ required: false })
  search?: string;

  @IsBooleanField({ required: false })
  withDeleted = false;

  @ApiPropertyOptional({ type: () => Array<string> })
  @ToArray()
  @IsStringField({ required: false, each: true })
  relations: string[] = [];

  @ApiPropertyOptional({ type: () => Array<string> })
  @ToArray()
  @IsStringField({ required: false, each: true })
  fields: string[] = [];
}
