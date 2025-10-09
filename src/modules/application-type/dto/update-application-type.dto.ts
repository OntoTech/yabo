import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationTypeDto } from './create-application-type.dto';

export class UpdateApplicationTypeDto extends PartialType(CreateApplicationTypeDto) {}
