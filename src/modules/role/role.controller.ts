import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GenericController } from '@common/decorators/controller.decorator';
import { ControllerFactory } from '@lib/crud';
import { Role } from '@entities';
import { OffsetPaginationDto } from '@common/dtos';

@GenericController('role', false)
export class RoleController extends ControllerFactory<
  Role,
  OffsetPaginationDto,
  CreateRoleDto,
  UpdateRoleDto
>(Role, OffsetPaginationDto, CreateRoleDto, UpdateRoleDto) {
  constructor(protected service: RoleService) {
    super();
  }
}
