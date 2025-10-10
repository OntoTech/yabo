import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { GenericController } from '@common/decorators/controller.decorator';
import { ControllerFactory } from '@lib/crud/crud.controller';
import { Application } from '@entities';
import { OffsetPaginationDto } from '@common/dtos';

@GenericController('application', false)
export class ApplicationController extends ControllerFactory<
  Application,
  OffsetPaginationDto,
  CreateApplicationDto,
  UpdateApplicationDto
>(
  Application,
  OffsetPaginationDto,
  CreateApplicationDto,
  UpdateApplicationDto,
) {
  constructor(protected service: ApplicationService) {
    super();
  }
}
