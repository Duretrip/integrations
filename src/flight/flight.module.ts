import { Module } from '@nestjs/common';
// import { FlightController } from './flight.controller.ts.old';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { AmadeusService } from 'src/amadeus/amadeus.service';
import { SabreService } from 'src/sabre/sabre.service';
  
@Module({
    controllers: [FlightController],
    providers: [FlightService, AmadeusService, SabreService],
})
export class FlightModule { }
