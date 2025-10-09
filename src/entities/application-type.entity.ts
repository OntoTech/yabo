import { BaseEntity } from '@common/database';
import { Entity, ManyToOne, Property, Ref, Rel } from '@mikro-orm/postgresql';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity()
export class ApplicationType extends BaseEntity {
  @ApiProperty()
  @Property({ unique: true, index: true })
  name: string;

  @ManyToOne({ index: true })
  createdBy?: Rel<Ref<User>>;
}
