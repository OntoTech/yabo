import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  create(createRoleDto: CreateRoleDto) {
    return `This action adds a new role with: ${JSON.stringify(createRoleDto)}`;
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role with: ${JSON.stringify(updateRoleDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
