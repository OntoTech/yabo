import { BadRequestException, NotFoundException } from '@nestjs/common';
import { from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { formatSearch } from 'helper-fns';
import { BaseEntity } from './base.entity';
import {
  CursorPaginationResponse,
  CursorType,
  getOppositeOrder,
  getQueryOrder,
  OffsetMeta,
  OffsetPaginationResponse,
  OppositeOrder,
  Order,
  PaginateOptions,
  QBCursorPaginationOptions,
  QBOffsetPaginationOptions,
  QueryOrder,
} from '@common/@types';
import {
  Dictionary,
  EntityManager,
  EntityRepository,
  FilterQuery,
  FindOneOptions,
  FindOptions,
  Loaded,
  OrderDefinition,
  QBFilterQuery,
  QueryOrderMap,
} from '@mikro-orm/postgresql';

export class BaseRepository<T extends BaseEntity> extends EntityRepository<T> {
  private readonly encoding: BufferEncoding = 'base64';

  exists(where: QBFilterQuery<T>): Observable<boolean> {
    return from(this.qb().where(where).getCount()).pipe(
      map((count) => count > 0),
    );
  }

  getEntityName(): string {
    return this.entityName.toString();
  }

  /**
   * Find an entity by criteria and throw an error if it exists
   * @param criteria - The search criteria for finding the entity
   * @param errorMessage - Optional custom error message (default: "Entity already exists")
   */
  async findOneOrThrow(
    where: FilterQuery<T>,
    options?: FindOneOptions<T>,
  ): Promise<T> {
    const entity = await this.findOne(where, options);
    if (!entity) {
      throw new NotFoundException(
        `${this.getEntityName()} not found by filter: ${JSON.stringify(where)}`,
      );
    }

    return entity;
  }

  softRemove(entity: T): EntityManager {
    entity.deletedAt = new Date();
    entity.isDeleted = true;
    this.em.persist(entity);

    return this.em;
  }

  softRemoveAndFlush(entity: T): Observable<T> {
    entity.deletedAt = new Date();
    entity.isDeleted = true;

    return from(this.em.persistAndFlush(entity)).pipe(map(() => entity));
  }

  findAndPaginate<Populate extends string = never>(
    where: FilterQuery<T>,
    options?: FindOptions<T, Populate>,
  ): Observable<{ total: number; results: Loaded<T, Populate>[] }> {
    return from(this.findAndCount(where, options)).pipe(
      map(([results, total]) => ({ total, results })),
    );
  }

  delete(entity: T): T {
    this.em.remove(entity);

    return entity;
  }

  findAndDelete(where: FilterQuery<T>): Observable<T> {
    return from(this.findOne(where)).pipe(
      switchMap((entity) => {
        if (!entity) {
          return throwError(
            () =>
              new NotFoundException(
                `Entity of type ${this.getEntityName()} is not found`,
              ),
          );
        }
        this.em.remove(entity);

        return of(entity);
      }),
    );
  }

  findAndSoftDelete(where: FilterQuery<T>): Observable<T> {
    return from(this.findOne(where)).pipe(
      switchMap((entity) => {
        if (!entity) {
          return throwError(
            () =>
              new NotFoundException(
                `Entity of type ${this.getEntityName()} is not found`,
              ),
          );
        }

        return this.softRemoveAndFlush(entity);
      }),
    );
  }

  private getFilters<T>(
    cursor: keyof T,
    decoded: string | number | Date,
    order: Order | OppositeOrder,
  ): FilterQuery<Dictionary<T>> {
    return {
      [cursor]: {
        [order]: decoded,
      },
    };
  }

  decodeCursor(
    cursor: string,
    cursorType: CursorType = CursorType.STRING,
  ): string | number | Date {
    const string = Buffer.from(cursor, this.encoding).toString('utf8');

    switch (cursorType) {
      case CursorType.DATE: {
        const millisUnix = Number.parseInt(string, 10);

        if (Number.isNaN(millisUnix)) {
          throw new BadRequestException(`Invalid date for cursor`);
        }

        return new Date(millisUnix);
      }
      case CursorType.NUMBER: {
        const number = Number.parseInt(string, 10);

        if (Number.isNaN(number)) {
          throw new BadRequestException(`Invalid number for cursor`);
        }

        return number;
      }
      default: {
        return string;
      }
    }
  }

  encodeCursor(value: Date | string | number): string {
    let string = value.toString();

    if (value instanceof Date) {
      string = value.getTime().toString();
    }

    return Buffer.from(string, 'utf8').toString(this.encoding);
  }

  private getOrderBy<T>(
    cursor: keyof T,
    order: QueryOrder,
  ): OrderDefinition<T> {
    return {
      [cursor]: order,
    } as QueryOrderMap<T>;
  }

  qbOffsetPagination<T extends Dictionary>(
    dto: QBOffsetPaginationOptions<T>,
  ): Observable<OffsetPaginationResponse<T>> {
    const { qb, pageOptionsDto } = dto;

    const {
      limit,
      offset,
      order,
      sort,
      fields,
      search,
      from: fromDate,
      relations,
      to,
      searchField,
      alias,
    } = pageOptionsDto;

    const selectedFields = [...new Set([...fields, 'id'])];

    if (search) {
      qb.andWhere({
        [searchField]: {
          $ilike: formatSearch(search),
        },
      });
    }

    if (relations) {
      for (const relation of relations) {
        qb.leftJoinAndSelect(`${alias}.${relation}`, `${alias}_${relation}`);
      }
    }

    if (fromDate) {
      qb.andWhere({
        createdAt: {
          $gte: fromDate,
        },
      });
    }

    if (to) {
      qb.andWhere({
        createdAt: {
          $lte: to,
        },
      });
    }

    qb.orderBy({ [sort]: order.toLowerCase() })
      .limit(limit)
      .select(selectedFields)
      .offset(offset);

    const paginations$ = from(qb.getResultAndCount());

    return paginations$.pipe(
      map(([results, itemCount]) => {
        const pageMetaDto = new OffsetMeta({ pageOptionsDto, itemCount });

        return new OffsetPaginationResponse(results, pageMetaDto);
      }),
    );
  }

  async qbCursorPagination<T extends Dictionary>(
    dto: QBCursorPaginationOptions<T>,
  ): Promise<CursorPaginationResponse<T>> {
    const { qb, pageOptionsDto } = dto;

    const {
      after,
      first,
      search,
      relations,
      alias,
      cursor,
      order,
      cursorType,
      fields,
      withDeleted,
      from: fromDate,
      to,
      searchField,
    } = pageOptionsDto;

    qb.where({
      isDeleted: withDeleted,
    });

    if (search && searchField) {
      qb.andWhere({
        [searchField]: {
          $ilike: formatSearch(search),
        },
      });
    }

    if (relations) {
      for (const relation of relations) {
        qb.leftJoinAndSelect(`${alias}.${relation}`, `${alias}_${relation}`);
      }
    }

    if (fromDate) {
      qb.andWhere({
        createdAt: {
          $gte: fromDate,
        },
      });
    }

    if (to) {
      qb.andWhere({
        createdAt: {
          $lte: to,
        },
      });
    }

    let previousCount = 0;
    const stringCursor = String(cursor);
    const aliasCursor = `${alias}.${stringCursor}`;
    const selectedFields = [...new Set([...fields, 'id'])];

    if (after) {
      const decoded = this.decodeCursor(after, cursorType);
      const oppositeOd = getOppositeOrder(order);
      const temporaryQb = qb.clone();

      temporaryQb.andWhere(this.getFilters(cursor, decoded, oppositeOd));
      previousCount = await temporaryQb.count(aliasCursor, true);

      const normalOd = getQueryOrder(order);

      qb.andWhere(this.getFilters(cursor, decoded, normalOd));
    }

    const [entities, count]: [T[], number] = await qb
      .select(selectedFields)
      .orderBy(this.getOrderBy(cursor, order))
      .limit(first)
      .getResultAndCount();

    return this.paginateCursor({
      instances: entities,
      currentCount: count,
      previousCount,
      cursor,
      first,
      search,
    });
  }

  private paginateCursor<T>(
    dto: PaginateOptions<T>,
  ): CursorPaginationResponse<T> {
    const { instances, currentCount, previousCount, cursor, first, search } =
      dto;
    const pages: CursorPaginationResponse<T> = {
      data: instances,
      meta: {
        nextCursor: '',
        hasPreviousPage: false,
        hasNextPage: false,
        search: search ?? '',
      },
    };
    const length = instances.length;

    if (length > 0) {
      const last = instances[length - 1]![cursor] as string | number | Date;

      pages.meta.nextCursor = this.encodeCursor(last);
      pages.meta.hasNextPage = currentCount > first;
      pages.meta.hasPreviousPage = previousCount > 0;
    }

    return pages;
  }

  async findAndCountPagination<T extends Dictionary>(
    cursor: keyof T,
    first: number,
    order: QueryOrder,
    repo: EntityRepository<T>,
    where: FilterQuery<T>,
    after?: string,
    afterCursor: CursorType = CursorType.STRING,
  ): Promise<CursorPaginationResponse<T>> {
    let previousCount = 0;

    if (after) {
      const decoded = this.decodeCursor(after, afterCursor);
      const queryOrder = getQueryOrder(order);
      const oppositeOrder = getOppositeOrder(order);
      const countWhere = where;

      // @ts-expect-error 'and is a valid key for FilterQuery'
      countWhere.$and = this.getFilters('createdAt', decoded, oppositeOrder);
      previousCount = await repo.count(countWhere);

      // @ts-expect-error 'and is a valid key for FilterQuery'
      where.$and = this.getFilters('createdAt', decoded, queryOrder);
    }

    const [entities, count] = await repo.findAndCount(where, {
      orderBy: this.getOrderBy(cursor, order),
      limit: first,
    });

    return this.paginateCursor({
      instances: entities,
      currentCount: count,
      previousCount,
      cursor,
      first,
    });
  }
}
