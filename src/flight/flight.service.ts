import { Injectable } from '@nestjs/common';
import { FlightRequestDTO } from './dto/flight-request.dto';
import { AggregateOffer, AggregateResponseDto } from './dto/flight-response.dto';
import axios, { AxiosInstance } from 'axios';
import { HttpService } from '@nestjs/axios';
import { FlightOffersPricingRequestDTO } from './dto/flight-price-request.dto';
import { FlightOffersPricingResponseDTO } from './dto/flight-price-response.dto';
import BookingRequestDto from './dto/create-booking.dto';
import { FlightOffersPricingDto } from './dto/booking-response.dto';
import { AmadeusService } from 'src/amadeus/amadeus.service';
import { SabreService } from 'src/sabre/sabre.service';
import { transform } from 'src/utils/flight-search-transformer';

@Injectable()
export class FlightService {
  constructor(
    private readonly amadeusService: AmadeusService,
    private readonly sabreService: SabreService,
  ) { }

  async searchFlights(flightRequest: FlightRequestDTO): Promise<AggregateResponseDto> {
    let aggregate: AggregateResponseDto = {
      meta: {},
      data: [],
      dictionary: {
        locations: {},
        aircraft: {},
        currencies: {},
        carriers: {},
      }
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
      const amadeusResult = await this.amadeusService.searchFlights(flightRequest);
      const amadeusData = amadeusResult.data;
      if (amadeusData) {
        transform(aggregate, amadeusData, 'amadeus')
      }
    } catch (error) {
      console.log('amadeus error', error);
    }

    return aggregate;

  }

  async getFlightPrice(requestDto: FlightOffersPricingRequestDTO): Promise<FlightOffersPricingResponseDTO> {
    try {
      const response = await axios.post(`/shopping/flight-offers/pricing?forceClass=false`, {
        'type': 'flight-offers-pricing',
        'flightOffers': requestDto
      }, {
        baseURL: process.env.AMADEUS_API_URL, // Replace with your base URL
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.AMADEUS_API_TOKEN,
        },
      });

      return response.data;
    } catch (error) {
      console.log('errorMessage: ', error.message);
      // throw new Error('Failed to fetch flight offer price');
    }
  }

  async createOrder(requestDto: BookingRequestDto): Promise<FlightOffersPricingDto> {
    try {
      const response = await axios.post(`/booking/flight-orders`, requestDto, {
        baseURL: process.env.AMADEUS_API_URL, // Replace with your base URL
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.AMADEUS_API_TOKEN,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching flight offer price:', error.message);
      throw new Error('Failed to fetch flight offer price');
    }
  }
}
