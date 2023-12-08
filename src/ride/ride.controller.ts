import { Body, Controller, Post } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideRequestDTO } from 'src/amadeus/dto/ride-request.dto';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) { }

  @Post('/search')
  // remember to add response dto
  async searchFlights(@Body() rideRequest: RideRequestDTO) {
    return this.rideService.searchRides(rideRequest);
  }

}
