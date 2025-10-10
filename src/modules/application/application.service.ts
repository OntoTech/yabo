import { Injectable } from '@nestjs/common';
import { BaseService } from '@lib/crud/crud.service';
import { Application } from '@entities';
import { OffsetPaginationDto } from '@common/dtos';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BaseRepository } from '@common/database';

@Injectable()
export class ApplicationService extends BaseService<
  Application,
  OffsetPaginationDto
> {
  protected readonly queryName = 'a';
  protected readonly searchField = 'name';

  constructor(
    @InjectRepository(Application)
    private applicationRepository: BaseRepository<Application>,
  ) {
    super(applicationRepository);
  }
}
