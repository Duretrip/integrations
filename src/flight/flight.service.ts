import { Injectable } from '@nestjs/common';
import { FlightRequestDTO } from './dto/flight-request.dto';
import { FlightResponseDTO } from './dto/flight-response.dto';
import axios from 'axios';
import { HttpService } from '@nestjs/axios';
import { FlightOffersPricingRequestDTO } from './dto/flight-price-request.dto';
import { FlightOffersPricingResponseDTO } from './dto/flight-price-response.dto';
import BookingRequestDto from './dto/create-booking.dto';
import { FlightOffersPricingDto } from './dto/booking-response.dto';

@Injectable()
export class FlightService {
  constructor() { }

  async searchFlights(flightRequest: FlightRequestDTO): Promise<FlightResponseDTO> {
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
      const response = await axios.post(`/shopping/flight-offers/pricing?forceClass=false`, requestDto, {
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
