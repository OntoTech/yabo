import { Injectable } from '@nestjs/common';
import { CreateApplicationTypeDto } from './dto/create-application-type.dto';
import { UpdateApplicationTypeDto } from './dto/update-application-type.dto';

@Injectable()
export class ApplicationTypeService {
  create(createApplicationTypeDto: CreateApplicationTypeDto) {
    return `This action adds a new application with: ${JSON.stringify(createApplicationTypeDto)}`;
  }

  findAll() {
    return `This action returns all applicationType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} applicationType`;
  }

  update(id: number, updateApplicationTypeDto: UpdateApplicationTypeDto) {
    return `This action updates a #${id} application with: ${JSON.stringify(updateApplicationTypeDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} applicationType`;
  }
}
