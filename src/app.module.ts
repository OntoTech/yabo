import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './application/application.module';
import { ApplicationTypeModule } from './application-type/application-type.module';
import { AttributeModule } from './attribute/attribute.module';
import { AttributeTypeModule } from './attribute-type/attribute-type.module';

@Module({
  imports: [ApplicationModule, ApplicationTypeModule, AttributeModule, AttributeTypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
