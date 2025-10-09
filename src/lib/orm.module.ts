import { MikroOrmModule } from '@mikro-orm/nestjs';
import { defineConfig } from '@mikro-orm/postgresql';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Entities from '@entities';
import { baseOptions, BaseRepository } from '@common/database';

@Global()
@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Configs, true>) =>
        defineConfig({
          ...baseOptions,
          ...configService.getOrThrow('database'),
          entityRepository: BaseRepository,
        }),
    }),
    MikroOrmModule.forFeature({
      entities: Object.values(Entities),
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
