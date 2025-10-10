import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { GenericController } from '@common/decorators/controller.decorator';
import { ControllerFactory } from '@lib/crud';
import { Attribute } from '@entities';
import { OffsetPaginationDto } from '@common/dtos';

@GenericController('attribute', false)
export class AttributeController extends ControllerFactory<
  Attribute,
  OffsetPaginationDto,
  CreateAttributeDto,
  UpdateAttributeDto
>(Attribute, OffsetPaginationDto, CreateAttributeDto, UpdateAttributeDto) {
  constructor(protected service: AttributeService) {
    super();
  }
}
