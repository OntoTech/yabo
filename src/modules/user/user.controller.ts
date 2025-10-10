import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenericController } from '@common/decorators/controller.decorator';
import { ControllerFactory } from '@lib/crud';
import { User } from '@entities';
import { OffsetPaginationDto } from '@common/dtos';

@GenericController('user', false)
export class UserController extends ControllerFactory<
  User,
  OffsetPaginationDto,
  CreateUserDto,
  UpdateUserDto
>(User, OffsetPaginationDto, CreateUserDto, UpdateUserDto) {
  constructor(protected service: UserService) {
    super();
  }
}
