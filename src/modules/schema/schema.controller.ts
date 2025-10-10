import { SchemaService } from './schema.service';
import { CreateSchemaDto } from './dto/create-schema.dto';
import { UpdateSchemaDto } from './dto/update-schema.dto';
import { GenericController } from '@common/decorators/controller.decorator';
import { Schema } from '@entities';
import { OffsetPaginationDto } from '@common/dtos';
import { ControllerFactory } from '@lib/crud';

@GenericController('schema', false)
export class SchemaController extends ControllerFactory<
  Schema,
  OffsetPaginationDto,
  CreateSchemaDto,
  UpdateSchemaDto
>(Schema, OffsetPaginationDto, CreateSchemaDto, UpdateSchemaDto) {
  constructor(protected service: SchemaService) {
    super();
  }
}
