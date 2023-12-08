import { ApiProperty } from "@nestjs/swagger";

export class HotelResponseDto {
    meta: {
        count?: number;
    };
    data: HotelOffer[];
    dictionaries: {
        locations: Record<string, Location>;
        aircraft: Record<string, string>;
        currencies: Record<string, string>;
        carriers: Record<string, string>;
    };
}

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

export class HotelOffer {
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