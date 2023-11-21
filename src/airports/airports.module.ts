import { Module } from '@nestjs/common';
import { AirportsService } from './airports.service';
import { AirportsController } from './airports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airports } from './entities/airport.entity';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@Module({
  imports: [TypeOrmModule.forFeature([Airports])],
  controllers: [AirportsController],
  providers: [AirportsService, RabbitMQService]
})
export class AirportModule {}
