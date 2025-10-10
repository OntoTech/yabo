import { ApplicationTypeService } from './application-type.service';
import { CreateApplicationTypeDto } from './dto/create-application-type.dto';
import { UpdateApplicationTypeDto } from './dto/update-application-type.dto';
import { GenericController } from '@common/decorators/controller.decorator';
import { ControllerFactory } from '@lib/crud';
import { ApplicationType } from '@entities';
import { OffsetPaginationDto } from '@common/dtos';

@GenericController('application-type', false)
export class ApplicationTypeController extends ControllerFactory<
  ApplicationType,
  OffsetPaginationDto,
  CreateApplicationTypeDto,
  UpdateApplicationTypeDto
>(
  ApplicationType,
  OffsetPaginationDto,
  CreateApplicationTypeDto,
  UpdateApplicationTypeDto,
) {
  constructor(protected service: ApplicationTypeService) {
    super();
  }
}
