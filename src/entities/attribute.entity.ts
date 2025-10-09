import { BaseEntity } from '@common/database';
import {
  Entity,
  JsonType,
  ManyToOne,
  Property,
  Ref,
  Rel,
} from '@mikro-orm/postgresql';
import { User } from './user.entity';

@Entity()
export class Attribute extends BaseEntity {
  @Property({ type: JsonType })
  properties: JSON;

  @ManyToOne({ index: true })
  createdBy?: Rel<Ref<User>>;

  constructor(partial?: Partial<Attribute>) {
    super();
    Object.assign(this, partial);
  }
}
