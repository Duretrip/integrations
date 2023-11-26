import { Injectable } from '@nestjs/common';
import { FlightRequestDTO } from './dto/flight-request.dto';
import { FlightResponseDTO } from './dto/flight-response.dto';
import axios, { AxiosInstance } from 'axios';
import { HttpService } from '@nestjs/axios';
import { FlightOffersPricingRequestDTO } from './dto/flight-price-request.dto';
import { FlightOffersPricingResponseDTO } from './dto/flight-price-response.dto';
import BookingRequestDto from './dto/create-booking.dto';
import { FlightOffersPricingDto } from './dto/booking-response.dto';
import { AmadeusService } from 'src/amadeus/amadeus.service';
import { SabreService } from 'src/sabre/sabre.service';

@Injectable()
export class FlightService {
  constructor(
    private readonly amadeusService: AmadeusService,
    private readonly sabreService: SabreService,
  ) { }

  async searchFlights(flightRequest: FlightRequestDTO): Promise<FlightResponseDTO> {
    // let result = []; //initialize the result array. An array of objects that contain the GDS name as a different object
    // // Call Amadeus with a timeout of 3 seconds
    // try {
    //   const sabreResult = await this.sabreService.searchFlights(flightRequest);
    //   console.log({ sabreResult: JSON.stringify(sabreResult) });
    // } catch (error) {
    //   console.log('sabre error', error);
    // }

    // try {
    //   const amadeusResult = await this.amadeusService.searchFlights(flightRequest);
    //   console.log({ amadeusResult: JSON.stringify(amadeusResult) });
    //   result = amadeusResult
    // } catch (error) {
    //   console.log('sabre error', error);
    // }
    // return response.data;



    // Use the transformer util function on Amadeus response


    // Call Sabre with a timeout of 3 seconds


    // Use the transformer util function on Sabre response


    // Use the sorting util function based on search params

    // return response



    // Call the third-party API using axios or any HTTP library
    const response = await axios.post(`/shopping/flight-offers`, flightRequest, {
      baseURL: process.env.AMADEUS_API_URL, // Replace with your base URL
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.AMADEUS_API_TOKEN,
      },
    });

    // Return the response data or handle it as needed
    return response.data;

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
      console.log('response wa', response);

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