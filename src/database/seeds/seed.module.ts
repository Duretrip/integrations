// seed.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AirportSeedModule } from './airports/airport-seed.module';
import { TypeOrmConfigService } from '../typeorm-config.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'src/config/database.config';
import appConfig from 'src/config/app.config';

@Module({
  imports: [
    AirportSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
})
export class SeedModule {}
