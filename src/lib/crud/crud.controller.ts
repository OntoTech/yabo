import {
  CreateEntityType,
  Crud,
  PaginationResponse,
  PERMISIONS,
  UpdateEntityType,
} from '@common/@types';
import { BaseEntity } from '@common/database';
import { AppUtils } from '@common/helpers';
import {
  ArgumentMetadata,
  Body,
  Delete,
  Get,
  Injectable,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Type,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BaseService } from './crud.service';
import {
  SwaggerResponse,
  ApiPaginatedResponse,
  CurrentUser,
  Permissions,
} from '@common/decorators';
import { Observable } from 'rxjs';
import { User } from '@entities';
import { ApiExcludeEndpoint, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { OffsetPaginationDto } from '@common/dtos';
import { PermissionsGuard, UserGuard } from '@common/guards';

@Injectable()
export class AbstractValidationPipe extends ValidationPipe {
  constructor(
    private readonly targetTypes: {
      body?: Type<any>;
      query?: Type<any>;
      param?: Type<any>;
      custom?: Type<any>;
    },
  ) {
    super(AppUtils.validationPipeOptions());
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const targetType = this.targetTypes[metadata.type] as Type<any>;

    if (targetType === null) {
      return super.transform(value, metadata);
    }

    return super.transform(value, { ...metadata, metatype: targetType });
  }
}

export class CustomQuery {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  randomString: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  randomString2: string;
}

export function ControllerFactory<
  T extends BaseEntity,
  Q extends OffsetPaginationDto,
  // TODO: fix this
  // Q extends PaginationRequest,
  C extends CreateEntityType<T>,
  U extends UpdateEntityType<T>,
>(
  entity: Type<T>,
  queryDto: Type<Q>,
  createDto: Type<C>,
  updateDto: Type<U>,
): Type<Crud<T, Q, C, U>> {
  const createPipe = new AbstractValidationPipe({
    body: createDto,
  });
  const updatePipe = new AbstractValidationPipe({
    body: updateDto,
  });

  const queryPipe = new AbstractValidationPipe({ query: queryDto });

  class CrudController<
    T extends BaseEntity,
    Q extends OffsetPaginationDto,
    // TODO: fix this
    // Q extends PaginationRequest,
    C extends CreateEntityType<T>,
    U extends UpdateEntityType<T>,
  > implements Crud<T, Q, C, U>
  {
    protected service!: BaseService<T, Q, C, U>;
    private readonly logger: Logger = new Logger(CrudController.name);

    @Get(':id')
    @SwaggerResponse({
      operation: 'Find item',
      notFound: 'Item does not exists.',
      badRequest: 'Something went wrong.',
      params: ['id'],
    })
    findOne(@Param('id', ParseIntPipe) id: number): Observable<T> {
      return this.service.findOne(id);
    }

    @ApiExcludeEndpoint()
    @Get(':id/full')
    @SwaggerResponse({
      operation: 'Get Full Entity',
      notFound: 'Entity does not exists.',
      badRequest: 'Something went wrong.',
      params: ['id'],
    })
    getFullEntity(@Param('id', ParseIntPipe) id: number): Observable<T> {
      return this.service.getFullEntity(id);
    }

    @Get()
    @ApiPaginatedResponse(entity)
    @UsePipes(queryPipe)
    findAll(
      @Query() query: OffsetPaginationDto,
    ): Observable<PaginationResponse<T>> {
      return this.service.findAll(query);
    }

    @Post()
    @SwaggerResponse({
      operation: 'Create item',
      badRequest: 'Item already exists.',
      body: createDto,
      response: updateDto,
    })
    @UsePipes(createPipe)
    @UseGuards(UserGuard, PermissionsGuard)
    @Permissions([PERMISIONS.ADMIN, PERMISIONS.MANAGER])
    create(@Body() body: C, @CurrentUser() user?: User): Observable<T> {
      return this.service.create(body, user);
    }

    @SwaggerResponse({
      operation: 'Item update',
      badRequest: 'Item does not exist.',
      params: ['id'],
      body: updateDto,
      response: updateDto,
    })
    @UsePipes(updatePipe)
    @Patch(':id')
    @UseGuards(UserGuard, PermissionsGuard)
    @Permissions([PERMISIONS.ADMIN, PERMISIONS.MANAGER, PERMISIONS.AUTHOR])
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() body: U,
    ): Observable<T> {
      return this.service.update(id, body);
    }

    @SwaggerResponse({
      operation: 'Item delete',
      badRequest: 'Item does not exist.',
      params: ['id'],
      response: updateDto,
    })
    @Delete(':id')
    @UseGuards(UserGuard, PermissionsGuard)
    @Permissions([PERMISIONS.ADMIN])
    remove(@Param('id', ParseIntPipe) id: number): Observable<T> {
      return this.service.remove(id);
    }
  }

  return CrudController;
}
