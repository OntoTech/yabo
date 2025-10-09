import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';
import { Allow, IsOptional } from 'class-validator';
import { PaginationType, QueryOrder } from '@common/@types';
import { IsEnumField, IsNumberField, IsStringField } from '@common/decorators';

export class OffsetPaginationDto extends PaginationDto {
  @ApiHideProperty()
  @Allow()
  type: PaginationType.OFFSET = PaginationType.OFFSET;

  @ApiPropertyOptional({
    default: 1,
    description: 'Page number, starts from 1. Default is 1',
    type: Number,
  })
  @IsNumberField({ required: false })
  page = 1;

  @ApiPropertyOptional({
    default: 10,
    description: 'Number of items per page. Default is 10',
  })
  @IsNumberField()
  readonly limit: number = 10;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnumField(QueryOrder, { required: false })
  readonly order: QueryOrder = QueryOrder.DESC;

  @ApiPropertyOptional()
  @IsStringField({ required: false, maxLength: 50 })
  readonly sort: string = 'createdAt';

  get offset(): number {
    return (this.page - 1) * this.limit;
  }
}
