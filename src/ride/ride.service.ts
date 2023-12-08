import { Injectable } from '@nestjs/common';
import { AmadeusService } from 'src/amadeus/amadeus.service';
import { RideRequestDTO } from 'src/amadeus/dto/ride-request.dto';
import { SabreService } from 'src/sabre/sabre.service';
import { transform } from 'src/utils/ride-search-transformer';
import { AggregateRideResponseDto } from './dto/ride-response.dto';

@Injectable()
export class RideService {
  constructor(
    private readonly amadeusService: AmadeusService,
    private readonly sabreService: SabreService,
  ) { }

  // remember to add response dto
  async searchRides(rideRequest: RideRequestDTO) {
    let aggregate: AggregateRideResponseDto = {
      meta: {},
      data: [],
      dictionaries: {}
    };


    //initialize the result array. An array of objects that contain the GDS name as a different object
    // Call Sabre with a timeout of 3 seconds
    // try {
    //   const sabreResult = await this.sabreService.searchFlights(flightRequest);
    //   console.log({ sabreResult: JSON.stringify(sabreResult) });
    // } catch (error) {
    //   console.log('sabre error', error);
    // }

    try {
      const amadeusResult = await this.amadeusService.searchRides(rideRequest);
      if (amadeusResult) {
        transform(aggregate, amadeusResult, 'amadeus')
      }
    } catch (error) {
      console.log('amadeus error', error);
    }

    return aggregate;

  }
}
