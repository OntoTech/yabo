import { IsStringField } from '@common/decorators';

export class CreateRoleDto {
  @IsStringField()
  name: string;

  @IsStringField()
  description: string;
}
