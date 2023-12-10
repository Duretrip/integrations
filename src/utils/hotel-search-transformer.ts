import { AggregateResponseDto } from "src/flight/dto/flight-response.dto";
import { airlines } from './airlines'

import { ApiProperty } from '@nestjs/swagger';
import { HotelResponseDto } from "src/hotels/dto/hotel-response.dto";
import { HotelOfferResponseDto } from "src/amadeus/dto/hotel-offer-response.dto";
import { AmadeusHotelOfferResponseDTO } from "src/hotels/dto/amadeus-hotel-offer.dto";

class GeoCodeDto {
  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;
}

class AddressDto {
  @ApiProperty()
  countryCode: string;
}

class DistanceDto {
  @ApiProperty()
  value: number;

  @ApiProperty()
  unit: string;
}

export class AmadeusHotelOffer {
  @ApiProperty()
  chainCode: string;

  @ApiProperty()
  iataCode: string;

  @ApiProperty()
  dupeId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  hotelId: string;

  @ApiProperty({ type: GeoCodeDto })
  geoCode: GeoCodeDto;

  @ApiProperty({ type: AddressDto })
  address: AddressDto;

  @ApiProperty({ type: DistanceDto })
  distance: DistanceDto;
}



export const transform = (aggregate: HotelResponseDto, hotelOffers: AmadeusHotelOffer[], duretrip_source: string): HotelResponseDto => {
  if (duretrip_source === 'amadeus') {
    let aggregateCopy = { ...aggregate };
    hotelOffers.map((hotelOffer, index) => {
      const { chainCode, iataCode, dupeId, name, hotelId, geoCode, address, distance } = hotelOffer;
      aggregateCopy.data.push({ chainCode, iataCode, dupeId, name, hotelId, geoCode, address, distance })
    });
    return aggregateCopy;
  }
  return null
};

export const transformHotelOffer = (aggregate: HotelOfferResponseDto, hotelOffers: AmadeusHotelOfferResponseDTO, duretrip_source: string): HotelOfferResponseDto => {
  if (duretrip_source === 'amadeus') {
    let aggregateCopy = { ...aggregate };
    const allOffers = hotelOffers.data;
    allOffers.map((hotelOffer, index) => {
      const { type, hotel, available, offers } = hotelOffer;
      aggregateCopy.data.push({ type, hotel, available, offers })
    });
    return aggregateCopy;
  }
  return null
};