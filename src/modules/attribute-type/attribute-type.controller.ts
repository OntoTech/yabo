import { AttributeTypeService } from './attribute-type.service';
import { CreateAttributeTypeDto } from './dto/create-attribute-type.dto';
import { UpdateAttributeTypeDto } from './dto/update-attribute-type.dto';
import { GenericController } from '@common/decorators/controller.decorator';
import { ControllerFactory } from '@lib/crud';
import { AttributeType } from 'entities/attribute-type.entity';
import { OffsetPaginationDto } from '@common/dtos';

@GenericController('attribute-type', false)
export class AttributeTypeController extends ControllerFactory<
  AttributeType,
  OffsetPaginationDto,
  CreateAttributeTypeDto,
  UpdateAttributeTypeDto
>(
  AttributeType,
  OffsetPaginationDto,
  CreateAttributeTypeDto,
  UpdateAttributeTypeDto,
) {
  constructor(protected service: AttributeTypeService) {
    super();
  }
}
