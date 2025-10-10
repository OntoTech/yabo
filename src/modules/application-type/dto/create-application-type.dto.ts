import { IsStringField } from '@common/decorators';
import { Entity } from '@mikro-orm/core';

@Entity()
export class CreateApplicationTypeDto {
  @IsStringField()
  name!: string;
}
