import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { FlightRequestDTO } from './dto/flight-request.dto';
import { FlightResponseDTO } from './dto/flight-response.dto';

@Injectable()
export class SabreService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.SABRE_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.SABRE_API_SECRET,
      },
    });
  }
  

  async searchFlights(flightRequest: FlightRequestDTO): Promise<FlightResponseDTO> {
    // Call the third-party API using axios or any HTTP library
    const {originLocationCode, destinationLocationCode, departureDateTimeRange : {date, }} = flightRequest.originDestinations[0];
    const response = await this.axiosInstance.post(`/v4/offers/shop`,
      {
        "fromAirportCode": originLocationCode,
        "toAirportCode": destinationLocationCode,
        "timeStampLeave": date,
        // "timeStampReturn": "2018-10-08T11:00:00"
      }
    );

    // Return the response data or handle it as needed

    return response.data;
  }

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
