import { ApiHideProperty } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';
import { Allow, IsBase64, IsNumber, IsString } from 'class-validator';
import { PaginationType } from '@common/@types';

export class CursorPaginationDto extends PaginationDto {
  @ApiHideProperty()
  @Allow()
  type: PaginationType.CURSOR = PaginationType.CURSOR;

  @IsString()
  @IsBase64()
  after?: string;

  @IsNumber()
  first = 10;
}
