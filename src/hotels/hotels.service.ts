import { Injectable } from '@nestjs/common';
import { AmadeusService } from 'src/amadeus/amadeus.service';
import { SabreService } from 'src/sabre/sabre.service';
import { transform, transformHotelOffer } from 'src/utils/hotel-search-transformer';

@Injectable()
export class HotelsService {
    constructor(
        private readonly amadeusService: AmadeusService,
        private readonly sabreService: SabreService,
    ) { }

    async searchHotelsByCity(hotelRequest) {
        let aggregate = {
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
            const amadeusResult = await this.amadeusService.searchHotelsByCity(hotelRequest);
            
            const amadeusData = amadeusResult.data;
            if (amadeusData) {
                transform(aggregate, amadeusData, 'amadeus')
            }
        } catch (error) {
            console.log('amadeus error', error);
        }

        return aggregate;

    }

    async searchHotelsByGeoCode(hotelRequest) {
        let aggregate = {
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
            const amadeusResult = await this.amadeusService.searchHotelsByGeoCode(hotelRequest);
            const amadeusData = amadeusResult.data;
            if (amadeusData) {
                transform(aggregate, amadeusData, 'amadeus')
            }
        } catch (error) {
            console.log('amadeus error', error);
        }

        return aggregate;

    }

    async getHotelOffers(hotelOfferRequest) {
        let aggregate = {
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
            const amadeusResult = await this.amadeusService.getHotelOffers(hotelOfferRequest );
            if (amadeusResult) {
                transformHotelOffer(aggregate, amadeusResult, 'amadeus')
            }
        } catch (error) {
            console.log('amadeus error', error);
        }

        return aggregate;

    }
}
