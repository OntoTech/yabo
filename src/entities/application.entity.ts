import { BaseEntity } from '@common/database';
import { ApplicationType, Attribute, Role, User } from '@entities';
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
  Ref,
  Rel,
} from '@mikro-orm/postgresql';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Application extends BaseEntity {
  @ApiProperty()
  @Property()
  name!: string;

  @ApiProperty()
  @Property()
  description: string;

  @ManyToOne(() => ApplicationType)
  type: Rel<Ref<ApplicationType>>;

  @ManyToMany({ entity: () => Application, fixedOrder: true })
  @ApiProperty({ type: [Application], default: [] })
  children? = new Collection<Application>(this);

  @ManyToMany({ entity: () => Attribute, owner: true })
  attributes? = new Collection<Attribute>(this);

  @ManyToMany(() => Role)
  @ApiProperty({ type: [Role], default: [] })
  roles = new Collection<Role>(this);

  @ManyToOne({ index: true })
  createdBy?: Rel<Ref<User>>;

  constructor(partial?: Partial<Application>) {
    super();
    Object.assign(this, partial);
  }
}
