import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { AmadeusService } from 'src/amadeus/amadeus.service';
import { SabreService } from 'src/sabre/sabre.service';

@Module({
  controllers: [HotelsController],
  providers: [HotelsService, AmadeusService, SabreService]
})
export class HotelsModule {}
