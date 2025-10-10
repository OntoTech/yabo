import { Injectable } from '@nestjs/common';
import { BaseService } from '@lib/crud';
import { AttributeType } from '@entities';
import { OffsetPaginationDto } from '@common/dtos';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BaseRepository } from '@common/database';

@Injectable()
export class AttributeTypeService extends BaseService<
  AttributeType,
  OffsetPaginationDto
> {
  protected readonly queryName = 'y';
  protected readonly searchField = 'name';

  constructor(
    @InjectRepository(AttributeType)
    private attributeTypeRepository: BaseRepository<AttributeType>,
  ) {
    super(attributeTypeRepository);
  }
}
