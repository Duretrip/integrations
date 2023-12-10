import { Controller, Get, Query } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) { }
  @Get('/search/by-city')
  @ApiQuery({ name: 'cityCode', type: String, required: true })
  @ApiQuery({ name: 'radius', type: String, required: true })
  @ApiQuery({ name: 'radiusUnit', type: String, required: true })
  @ApiQuery({ name: 'amenities', type: [String], isArray: true, required: false })
  @ApiQuery({ name: 'ratings', type: [String], isArray: true, required: false })
  @ApiQuery({ name: 'hotelSource', type: [String], isArray: true, required: false })
  async searchHotelsByCity(
    @Query('cityCode') cityCode: string,
    @Query('radius') radius: string,
    @Query('radiusUnit') radiusUnit: string,
    @Query('amenities') amenities: string[],
    @Query('ratings') ratings: string[],
    @Query('hotelSource') hotelSource: string[]
  ) {
    const hotelRequest = { cityCode, radius, radiusUnit, amenities, ratings, hotelSource };
    return this.hotelsService.searchHotelsByCity(hotelRequest);
  }

  @Get('/search/by-geocode')
  @ApiQuery({ name: 'latitude', type: Number, required: true })
  @ApiQuery({ name: 'longitude', type: Number, required: true })
  @ApiQuery({ name: 'radius', type: String, required: true })
  @ApiQuery({ name: 'radiusUnit', type: String, required: true })
  @ApiQuery({ name: 'amenities', type: [String], isArray: true, required: false })
  @ApiQuery({ name: 'ratings', type: [String], isArray: true, required: false })
  @ApiQuery({ name: 'hotelSource', type: [String], isArray: true, required: false })
  async searchHotelsByGeoCode(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: string,
    @Query('radiusUnit') radiusUnit: string,
    @Query('amenities') amenities: string[],
    @Query('ratings') ratings: string[],
    @Query('hotelSource') hotelSource: string[]
  ) {
    const hotelRequest = { latitude, longitude, radius, radiusUnit, amenities, ratings, hotelSource };
    return this.hotelsService.searchHotelsByGeoCode(hotelRequest);
  }

  @Get('/offers')
  @ApiQuery({ name: 'hotelIds', type: [String], required: true })
  @ApiQuery({ name: 'adults', type: Number, required: false })
  @ApiQuery({ name: 'checkInDate', type: String, required: false })
  @ApiQuery({ name: 'checkOutDate', type: String, required: false })
  @ApiQuery({ name: 'countryOfResidence', type: String, required: false })
  @ApiQuery({ name: 'roomQuantity', type: Number, required: false })
  @ApiQuery({ name: 'priceRange', type: String, required: false })
  @ApiQuery({ name: 'currency', type: String, required: false })
  @ApiQuery({ name: 'paymentPolicy', type: String, required: false })
  @ApiQuery({ name: 'boardType', type: String, required: false })

  async getHotelOffers(
    @Query('hotelIds') hotelIds: string[],
    @Query('adults') adults: number,
    @Query('checkInDate') checkInDate: string,
    @Query('checkOutDate') checkOutDate: string,
    @Query('countryOfResidence') countryOfResidence: string,
    @Query('roomQuantity') roomQuantity: number,
    @Query('priceRange') priceRange: string,
    @Query('currency') currency: string,
    @Query('paymentPolicy') paymentPolicy: string,
    @Query('boardType') boardType: string
  ) {
    const hotelRequest = { hotelIds, adults, checkInDate, checkOutDate, countryOfResidence, roomQuantity, priceRange, currency, paymentPolicy, boardType };
    return this.hotelsService.getHotelOffers(hotelRequest);
  }
}
