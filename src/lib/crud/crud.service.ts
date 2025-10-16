import {
  CreateEntityType,
  Crud,
  CursorType,
  PaginationRequest,
  PaginationResponse,
  PaginationType,
  QueryOrder,
  UpdateEntityType,
} from '@common/@types';
import { BaseEntity, BaseRepository } from '@common/database';
import { User } from '@entities';
import {
  EntityData,
  EntityKey,
  FilterQuery,
  FromEntityType,
  wrap,
} from '@mikro-orm/postgresql';
import { Logger, NotFoundException } from '@nestjs/common';
import {
  from,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';

export abstract class BaseService<
  Entity extends BaseEntity,
  PRequest extends PaginationRequest,
  CreateDto extends CreateEntityType<Entity> = CreateEntityType<Entity>,
  UpdateDto extends UpdateEntityType<Entity> = UpdateEntityType<Entity>,
> implements Crud<Entity, PRequest, CreateDto, UpdateDto>
{
  protected searchField!: EntityKey<Entity>;
  protected queryName = 'entity';
  private readonly logger = new Logger(BaseService.name);

  protected constructor(private readonly repository: BaseRepository<Entity>) {}

  create(dto: CreateDto, _user?: User): Observable<Entity> {
    const entity = this.repository.create({ ...dto, createdBy: _user });

    return from(
      this.repository.getEntityManager().persistAndFlush(entity),
    ).pipe(map(() => entity));
  }

  findAll(dto: PaginationRequest): Observable<PaginationResponse<Entity>> {
    const qb = this.repository.createQueryBuilder(this.queryName);

    if (dto.type === PaginationType.CURSOR) {
      return from(
        this.repository.qbCursorPagination({
          qb,
          pageOptionsDto: {
            alias: this.queryName,
            cursor: 'id',
            cursorType: CursorType.NUMBER,
            order: QueryOrder.ASC,
            searchField: this.searchField,
            ...dto,
          },
        }),
      );
    }

    return this.repository.qbOffsetPagination({
      pageOptionsDto: {
        ...dto,
        fields: dto.fields || [],
        alias: this.queryName,
        offset: dto.offset,
        searchField: this.searchField,
      },
      qb,
    });
  }

  findOne(id: number): Observable<Entity> {
    return from(
      this.repository.findOne({ id } as FilterQuery<Entity>, {
        // TODO: replace any with generic type
        populate: ['*'] as any,
      }),
    ).pipe(
      mergeMap((entity) => {
        if (!entity) {
          return throwError(
            () =>
              new NotFoundException(
                `Entity of type ${this.repository.getEntityName()} is not found by id: ${id}`,
              ),
          );
        }

        return of(entity);
      }),
    );
  }

  getFullEntity(id: number): any {
    return this.findOne(id).subscribe({
      next(entity) {
        return wrap(entity).toObject();
      },
    });
  }

  findOneByCondition(condition: FilterQuery<Entity>) {
    return from(this.repository.findOne(condition)).pipe(
      mergeMap((entity) => of(entity)),
    );
  }

  update(id: number, dto: UpdateDto): Observable<Entity> {
    return this.findOne(id).pipe(
      switchMap((item) => {
        this.repository.assign(item, dto as EntityData<FromEntityType<Entity>>);

        return from(this.repository.getEntityManager().flush()).pipe(
          map(() => item),
        );
      }),
    );
  }

  remove(id: number): Observable<Entity> {
    return this.findOne(id).pipe(
      switchMap((item) => {
        return this.repository.removeAndFlush(item).pipe(map(() => item));
      }),
    );
  }
}
