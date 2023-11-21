import { Module } from '@nestjs/common';
import { AirportSeedService } from './airport-seed.service';

@Module({
  imports: [],
  providers: [AirportSeedService],
  exports: [AirportSeedService],
})
export class AirportSeedModule { }
