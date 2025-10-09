import { BaseEntity } from '@common/database';
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
  Ref,
  Rel,
  wrap,
} from '@mikro-orm/postgresql';
import { Role } from './role.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @Property({ index: true, unique: true })
  objectGUID: string;

  @Property({ index: true, unique: true })
  username!: string;

  @Property({ index: true, unique: true })
  email!: string;

  @Property()
  firstName: string;

  @Property()
  middleName: string;

  @Property()
  familyName: string;

  @Property()
  uid: string;

  @Property()
  sub: string;

  @ManyToMany(() => Role)
  @ApiProperty({ type: [Role], default: [] })
  roles = new Collection<Role>(this);

  @ManyToOne()
  createdBy?: Rel<Ref<User>>;

  constructor(data?: Pick<User, 'idx'>) {
    super();
    Object.assign(this, data);
  }

  @Property({ persist: false })
  isAdmin?: boolean = false;

  @Property({ persist: false })
  isManager?: boolean = false;

  toJSON() {
    return wrap<User>(this).toObject();
  }
}
