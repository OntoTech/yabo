import {
  EntityDTO,
  FromEntityType,
  RequiredEntityData,
} from '@mikro-orm/postgresql';

export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;

export type UpdateEntityType<Entity> = Partial<
  EntityDTO<FromEntityType<Entity>>
>;
export type CreateEntityType<Entity> = RequiredEntityData<Entity>;
