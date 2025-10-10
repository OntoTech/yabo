import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Attribute } from '@entities';
import { BaseRepository } from '@common/database/base.repository';
import { BaseService } from '@lib/crud';
import { OffsetPaginationDto } from '@common/dtos';

@Injectable()
export class AttributeService extends BaseService<
  Attribute,
  OffsetPaginationDto
> {
  protected readonly queryName = 't';
  protected readonly searchField = 'properties';

  constructor(
    @InjectRepository(Attribute)
    private attributeRepository: BaseRepository<Attribute>,
  ) {
    super(attributeRepository);
  }
}
