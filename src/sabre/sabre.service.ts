import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class SabreService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.AMADEUS_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.AMADEUS_API_TOKEN,
      },
    });
  }

  // async searchFlights(flightRequest: FlightRequestDTO): Promise<FlightResponseDTO> {
  //   // Call the third-party API using axios or any HTTP library
  //   const response = await this.axiosInstance.post(`/shopping/flight-offers`, flightRequest);

  //   // Return the response data or handle it as needed

  //   return response.data;
  // }

  // async getFlightPrice(requestDto: FlightOffersPricingRequestDTO): Promise<FlightOffersPricingResponseDTO> {
  //   try {
  //     const response = await this.axiosInstance.post(`/shopping/flight-offers/pricing?forceClass=false`, requestDto);

  //     return response.data;
  //   } catch (error) {
  //     console.log('errorMessage: ', error.message);
  //     // throw new Error('Failed to fetch flight offer price');
  //   }
  // }

  // async createOrder(requestDto: BookingRequestDto): Promise<FlightOffersPricingDto> {
  //   try {
  //     const response = await this.axiosInstance.post(`/booking/flight-orders`, requestDto);

  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching flight offer price:', error.message);
  //     throw new Error('Failed to fetch flight offer price');
  //   }
  // }
}
