import { IsEmailField, IsNumberField, IsStringField } from '@common/decorators';

export class CreateUserDto {
  @IsStringField()
  objectGUID: string;

  @IsStringField()
  username: string;

  @IsEmailField()
  email: string;

  @IsStringField()
  firstName: string;

  @IsStringField()
  middleName: string;

  @IsStringField()
  familyName: string;

  @IsStringField()
  uid: string;

  @IsStringField()
  sub: string;

  @IsNumberField({ required: false, each: true })
  roles?: Array<number>;
}
