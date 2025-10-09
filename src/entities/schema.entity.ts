import { BaseEntity } from '@common/database/base.entity';
import { Application, Attribute, User } from '@entities';
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
  Ref,
  Rel,
} from '@mikro-orm/postgresql';

@Entity()
export class Schema extends BaseEntity {
  @Property({ index: true })
  name!: string;

  @Property({ columnType: 'text' })
  description!: string;

  @ManyToMany({ entity: () => Application, fixedOrder: true })
  applications? = new Collection<Application>(this);

  @ManyToMany(() => Attribute)
  attributes? = new Collection<Attribute>(this);

  @ManyToOne({ index: true })
  createdBy?: Rel<Ref<User>>;

  constructor(partial?: Partial<Schema>) {
    super();
    Object.assign(this, partial);
  }
}
