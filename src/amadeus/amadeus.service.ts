import { Injectable } from '@nestjs/common';
import { FlightRequestDTO } from './dto/flight-request.dto';
import { FlightResponseDTO } from './dto/flight-response.dto';
import axios, { AxiosInstance } from 'axios';
import { HttpService } from '@nestjs/axios';
import { FlightOffersPricingRequestDTO } from './dto/flight-price-request.dto';
import { FlightOffersPricingResponseDTO } from './dto/flight-price-response.dto';
import BookingRequestDto from './dto/create-booking.dto';
import { FlightOffersPricingDto } from './dto/booking-response.dto';

@Injectable()
export class AmadeusService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.AMADEUS_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.AMADEUS_API_TOKEN,
      },
      timeout: 10000, // Set timeout to 3000 milliseconds (3 seconds)
    });
  }

  async searchFlights(flightRequest: FlightRequestDTO): Promise<FlightResponseDTO> {
    // Call the third-party API using axios or any HTTP library
    const response = await this.axiosInstance.post(`/shopping/flight-offers`, {
      "currencyCode": "USD",
      ...flightRequest
    });

    // Return the response data or handle it as needed

    return response.data;
  }

  async getFlightPrice(requestDto: FlightOffersPricingRequestDTO): Promise<FlightOffersPricingResponseDTO> {
    try {
      const response = await this.axiosInstance.post(`/shopping/flight-offers/pricing?forceClass=false`, {
        'type': 'flight-offers-pricing',
        'flightOffers': requestDto
      });

      return response.data;
    } catch (error) {
      console.log('errorMessage: ', error.message);
      // throw new Error('Failed to fetch flight offer price');
    }
  }

  async createOrder(requestDto: BookingRequestDto): Promise<FlightOffersPricingDto> {
    try {
      const response = await this.axiosInstance.post(`/booking/flight-orders`, requestDto);

      return response.data;
    } catch (error) {
      console.error('Error fetching flight offer price:', error.message);
      throw new Error('Failed to fetch flight offer price');
    }
  }
}
