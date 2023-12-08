import { Injectable } from '@nestjs/common';
import { FlightRequestDTO } from './dto/flight-request.dto';
import { FlightResponseDTO } from './dto/flight-response.dto';
import axios, { AxiosInstance } from 'axios';
import { HttpService } from '@nestjs/axios';
import { FlightOffersPricingRequestDTO } from './dto/flight-price-request.dto';
import { FlightOffersPricingResponseDTO } from './dto/flight-price-response.dto';
import BookingRequestDto from './dto/create-booking.dto';
import { FlightOffersPricingDto } from './dto/booking-response.dto';
import { HotelResponseDto } from 'src/hotels/dto/hotel-response.dto';
import { log } from 'console';
import { RideRequestDTO } from './dto/ride-request.dto';
import { AmadeusRideResponseDto } from 'src/ride/dto/ride-response.dto';

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
      timeout: 10000, // Set timeout to 3000 milliseconds
    });
  }

  async searchFlights(flightRequest: FlightRequestDTO): Promise<FlightResponseDTO> {
    // Call the third-party API using axios or any HTTP library
    const response = await this.axiosInstance.post(`/v2/shopping/flight-offers`, {
      "currencyCode": "USD",
      ...flightRequest
    });

    // Return the response data or handle it as needed

    return response.data;
  }

  async searchHotels(hotelRequest): Promise<HotelResponseDto> {

    const { cityCode, radius, radiusUnit, amenities, ratings, hotelSource } = hotelRequest;
    const apiUrl = '/v1/reference-data/locations/hotels/by-city';
    // Function to encode URI component and handle undefined values
    const encodeQueryParam = (param, value) => (value !== undefined ? `${param}=${encodeURIComponent(value)}` : '');

    // Constructing the query string
    const queryString = [
      encodeQueryParam('cityCode', cityCode),
      encodeQueryParam('radius', radius),
      encodeQueryParam('radiusUnit', radiusUnit),
      encodeQueryParam('amenities', amenities),
      encodeQueryParam('ratings', ratings),
      encodeQueryParam('hotelSource', hotelSource),
    ].filter(Boolean).join('&');

    const apiRequestUrl = apiUrl + (queryString ? `?${queryString}` : '');

    try {
      const response = await this.axiosInstance.get(apiRequestUrl);
      // Return the response data or handle it as needed
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async searchRides(rideRequest: RideRequestDTO): Promise<AmadeusRideResponseDto> {
    const apiUrl = '/v1/shopping/transfer-offers';

    try {
      const response = await this.axiosInstance.post(apiUrl, rideRequest);
      // Return the response data or handle it as needed
      if (response.data.errors) {
        return undefined
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
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
