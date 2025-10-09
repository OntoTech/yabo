import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './application/application.module';
import { ApplicationTypeModule } from './application-type/application-type.module';
import { AttributeModule } from './attribute/attribute.module';

@Module({
  imports: [ApplicationModule, ApplicationTypeModule, AttributeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
