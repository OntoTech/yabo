import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './application/application.module';
import { ApplicationTypeModule } from './application-type/application-type.module';
import { AttributeModule } from './attribute/attribute.module';
import { AttributeTypeModule } from './attribute-type/attribute-type.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { SchemaModule } from './schema/schema.module';
import { UserModule } from './user/user.module';
import { NestConfigModule } from '@lib/config/config.module';
import { OrmModule } from '@lib/orm.module';
import { UserMiddleware } from '@common/middlewares/user.middleware';
import { NestPinoModule } from '@lib/pino/pino.module';
import { QueryFailedFilter } from '@common/filters';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    NestPinoModule,
    OrmModule,
    NestConfigModule,
    ApplicationModule,
    ApplicationTypeModule,
    AttributeModule,
    AttributeTypeModule,
    AuthModule,
    RoleModule,
    SchemaModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: QueryFailedFilter }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
