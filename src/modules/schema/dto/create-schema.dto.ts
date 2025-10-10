import { IsNumberField, IsStringField } from '@common/decorators';

export class CreateSchemaDto {
  @IsStringField()
  name!: string;

  @IsStringField()
  description!: string;

  @IsNumberField({ each: true, required: false })
  applications?: Array<number>;

  @IsNumberField({ each: true, required: false })
  attributes?: Array<number>;
}
