import { Entity, PrimaryKey, Property } from '@mikro-orm/postgresql';
import { randomUUID } from 'node:crypto';
import { HelperUtils } from '../helpers/helpers.utils';

@Entity({ abstract: true })
export abstract class BaseEntity {
  @PrimaryKey({ index: true })
  id!: number;

  @Property({ index: true })
  idx?: string = randomUUID();

  @Property({ hidden: true })
  isDeleted? = false;

  @Property()
  deletedAt?: Date | null;

  @Property()
  createdAt? = HelperUtils.getTimeInUtc(new Date());

  @Property({
    onUpdate: () => HelperUtils.getTimeInUtc(new Date()),
    hidden: true,
  })
  updatedAt? = HelperUtils.getTimeInUtc(new Date());
}
