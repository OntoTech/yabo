import { Module } from '@nestjs/common';
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

@Module({
  imports: [ApplicationModule, ApplicationTypeModule, AttributeModule, AttributeTypeModule, AuthModule, RoleModule, SchemaModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
