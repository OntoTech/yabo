import { Injectable } from '@nestjs/common';
import { BaseService } from '@lib/crud';
import { Role } from '@entities';
import { OffsetPaginationDto } from '@common/dtos';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BaseRepository } from '@common/database';

@Injectable()
export class RoleService extends BaseService<Role, OffsetPaginationDto> {
  protected readonly queryName = 'r';
  protected readonly searchField = 'name';

  constructor(
    @InjectRepository(Role)
    private roleRepository: BaseRepository<Role>,
  ) {
    super(roleRepository);
  }
}
