import { Controller, Get, Query } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) { }
  @Get('/search')
  @ApiQuery({ name: 'cityCode', type: String, required: true })
  @ApiQuery({ name: 'radius', type: String, required: true })
  @ApiQuery({ name: 'radiusUnit', type: String, required: true })
  @ApiQuery({ name: 'amenities', type: [String], isArray: true, required: false })
  @ApiQuery({ name: 'ratings', type: [String], isArray: true, required: false })
  @ApiQuery({ name: 'hotelSource', type: [String], isArray: true, required: false })
  async searchHotels(
    @Query('cityCode') cityCode: string,
    @Query('radius') radius: string,
    @Query('radiusUnit') radiusUnit: string,
    @Query('amenities') amenities: string[],
    @Query('ratings') ratings: string[],
    @Query('hotelSource') hotelSource: string[]
  ) {
    const hotelRequest = { cityCode, radius, radiusUnit, amenities, ratings, hotelSource };
    return this.hotelsService.searchHotels(hotelRequest);
  }
}
