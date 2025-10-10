import { Injectable } from '@nestjs/common';
import { BaseService } from '@lib/crud';
import { Schema } from '@entities';
import { OffsetPaginationDto } from '@common/dtos';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BaseRepository } from '@common/database';

@Injectable()
export class SchemaService extends BaseService<Schema, OffsetPaginationDto> {
  protected readonly queryName = 's';
  protected readonly searchField = 'name';

  constructor(
    @InjectRepository(Schema)
    private schemaRepository: BaseRepository<Schema>,
  ) {
    super(schemaRepository);
  }
}
