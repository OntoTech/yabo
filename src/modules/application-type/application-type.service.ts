import { Injectable } from '@nestjs/common';
import { BaseService } from '@lib/crud';
import { ApplicationType } from '@entities';
import { OffsetPaginationDto } from '@common/dtos';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BaseRepository } from '@common/database';

@Injectable()
export class ApplicationTypeService extends BaseService<
  ApplicationType,
  OffsetPaginationDto
> {
  protected readonly queryName = 'e';
  protected readonly searchField = 'name';

  constructor(
    @InjectRepository(ApplicationType)
    private applicationTypeRepository: BaseRepository<ApplicationType>,
  ) {
    super(applicationTypeRepository);
  }
}
