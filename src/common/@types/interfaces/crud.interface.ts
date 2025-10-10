import { BaseEntity } from '@common/database';
import {
  PaginationResponse,
  PaginationRequest as TPaginationRequest,
} from './pagination.interface';
import { Observable } from 'rxjs';
import { User } from '@entities';
import { CreateEntityType, UpdateEntityType } from '../types/common.types';

export interface Crud<
  Entity extends BaseEntity,
  PaginationRequest extends TPaginationRequest,
  CreateDto extends CreateEntityType<Entity>,
  UpdateDto extends UpdateEntityType<Entity>,
> {
  findAll: (query: PaginationRequest) => Observable<PaginationResponse<Entity>>;

  findOne: (id: number) => Observable<Entity>;

  create: (dto: CreateDto, user?: User) => Observable<Entity>;

  update: (id: number, dto: UpdateDto) => Observable<Entity>;

  remove: (id: number) => Observable<Entity>;
}
