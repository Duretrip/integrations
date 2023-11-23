import { Module } from '@nestjs/common';
// import { FlightController } from './flight.controller.ts.old';
import { FlightService } from './flight.service';
import { HttpModule } from '@nestjs/axios';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { FlightController } from './flight.controller';
  
@Module({
    imports: [HttpModule.registerAsync({
        useFactory: async () => ({
            timeout: 5000,
            maxRedirects: 2,
        }),
    })],
    controllers: [FlightController],
    providers: [FlightService, RabbitMQService],
})
export class FlightModule { }
