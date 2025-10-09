import { BaseEntity } from '@common/database';
import { Entity, ManyToOne, Property, Ref, Rel } from '@mikro-orm/postgresql';
import { User } from './user.entity';

@Entity()
export class Role extends BaseEntity {
  @Property({ unique: true, index: true })
  name: string;

  @Property()
  description: string;

  @ManyToOne({ index: true })
  createdBy?: Rel<Ref<User>>;
}
