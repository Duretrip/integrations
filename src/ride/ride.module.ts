import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { AmadeusService } from 'src/amadeus/amadeus.service';
import { SabreService } from 'src/sabre/sabre.service';

@Module({
  controllers: [RideController],
  providers: [RideService, AmadeusService, SabreService]
})
export class RideModule {}
