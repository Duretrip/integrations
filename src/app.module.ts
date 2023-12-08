import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirportModule } from './airports/airports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { FlightModule } from './flight/flight.module';
import { SabreModule } from './sabre/sabre.module';
import { AmadeusModule } from './amadeus/amadeus.module';
import { HotelsModule } from './hotels/hotels.module';
import { RideModule } from './ride/ride.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        appConfig
      ],
      envFilePath: ['.env'],
    }),
    AirportModule,
    AmadeusModule,
    SabreModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    FlightModule,
    HotelsModule,
    RideModule,
  ],
  controllers: [AppController],
  providers: [AppService, RabbitMQService],
})
export class AppModule {}
