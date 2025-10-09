import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationService {
  create(createApplicationDto: CreateApplicationDto) {
    return `This action adds a new application with: ${JSON.stringify(createApplicationDto)}`;
  }

  findAll() {
    return `This action returns all application`;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application with: ${JSON.stringify(updateApplicationDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
