import { Injectable } from '@nestjs/common';
import { CreateSchemaDto } from './dto/create-schema.dto';
import { UpdateSchemaDto } from './dto/update-schema.dto';

@Injectable()
export class SchemaService {
  create(createSchemaDto: CreateSchemaDto) {
    return `This action adds a new schema with: ${JSON.stringify(createSchemaDto)}`;
  }

  findAll() {
    return `This action returns all schema`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schema`;
  }

  update(id: number, updateSchemaDto: UpdateSchemaDto) {
    return `This action updates a #${id} schema with: ${updateSchemaDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} schema`;
  }
}
