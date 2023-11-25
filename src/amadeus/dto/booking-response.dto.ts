import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class DepartureDto {
  @IsString()
  iataCode: string;

  @IsDateString()
  at: string;
}

class ArrivalDto {
  @IsString()
  iataCode: string;

  @IsString()
  terminal?: string;

  @IsDateString()
  at: string;
}

class SegmentDto {
  @ValidateNested()
  @Type(() => DepartureDto)
  departure: DepartureDto;

  @ValidateNested()
  @Type(() => ArrivalDto)
  arrival: ArrivalDto;

  @IsString()
  carrierCode: string;

  @IsNumber()
  number: number;

  @IsString()
  duration: string;

  @IsNumber()
  numberOfStops: number;

  @IsString()
  id: string;
}

class ItineraryDto {
  @ValidateNested({ each: true })
  @Type(() => SegmentDto)
  segments: SegmentDto[];
}

class FeeDto {
  @IsNumber()
  amount: number;

  @IsString()
  type: string;
}

class PriceDto {
  @IsString()
  currency: string;

  @IsNumber()
  total: number;

  @IsNumber()
  base: number;

  @ValidateNested({ each: true })
  @Type(() => FeeDto)
  fees: FeeDto[];

  @IsString()
  grandTotal: string;

  @IsString()
  billingCurrency: string;
}

class FareDetailsDto {
  @IsString()
  segmentId: string;

  @IsString()
  cabin: string;

  @IsString()
  fareBasis: string;

  @IsString()
  class: string;

  @ValidateNested()
  @Type(() => IncludedCheckedBagsDto)
  includedCheckedBags: IncludedCheckedBagsDto;
}

class IncludedCheckedBagsDto {
  @IsNumber()
  quantity: number;
}

class TravelerPricingDto {
  @IsString()
  travelerId: string;

  @IsString()
  fareOption: string;

  @IsString()
  travelerType: string;

  @ValidateNested()
  @Type(() => PriceDto)
  price: PriceDto;

  @ValidateNested({ each: true })
  @Type(() => FareDetailsDto)
  fareDetailsBySegment: FareDetailsDto[];
}

class FlightOfferDto {
  @IsString()
  type: string;

  @IsString()
  id: string;

  @IsString()
  source: string;

  @IsBoolean()
  instantTicketingRequired: boolean;

  @IsBoolean()
  nonHomogeneous: boolean;

  @IsString()
  lastTicketingDate: string;

  @ValidateNested({ each: true })
  @Type(() => ItineraryDto)
  itineraries: ItineraryDto[];

  @ValidateNested()
  @Type(() => PriceDto)
  price: PriceDto;

  @ValidateNested()
  @Type(() => PricingOptionsDto)
  pricingOptions: PricingOptionsDto;

  @IsString({ each: true })
  validatingAirlineCodes: string[];

  @ValidateNested({ each: true })
  @Type(() => TravelerPricingDto)
  travelerPricings: TravelerPricingDto[];

  @IsBoolean()
  paymentCardRequired: boolean;
}

class PricingOptionsDto {
  @IsString({ each: true })
  fareType: string[];

  @IsBoolean()
  includedCheckedBagsOnly: boolean;
}

class TravelerDto {
  @IsString()
  id: string;

  @IsDateString()
  dateOfBirth: string;

  @ValidateNested()
  @Type(() => NameDto)
  name: NameDto;

  @IsString()
  gender: string;

  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;

  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  documents: DocumentDto[];

  @ValidateNested()
  @Type(() => RemarksDto)
  remarks: RemarksDto;
}

class NameDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

class ContactDto {
  @IsString()
  emailAddress: string;

  @ValidateNested({ each: true })
  @Type(() => PhoneDto)
  phones: PhoneDto[];
}

class PhoneDto {
  @IsString()
  deviceType: string;

  @IsString()
  countryCallingCode: string;

  @IsString()
  number: string;
}

class DocumentDto {
  @IsString()
  documentType: string;

  @IsString()
  birthPlace: string;

  @IsString()
  issuanceLocation: string;

  @IsDateString()
  issuanceDate: string;

  @IsString()
  number: string;

  @IsDateString()
  expiryDate: string;

  @IsString()
  issuanceCountry: string;

  @IsString()
  validityCountry: string;

  @IsString()
  nationality: string;

  @IsBoolean()
  holder: boolean;
}

class RemarksDto {
  @ValidateNested({ each: true })
  @Type(() => GeneralDto)
  general: GeneralDto[];
}

class GeneralDto {
  @IsString()
  subType: string;

  @IsString()
  text: string;
}

class TicketingAgreementDto {
  @IsString()
  option: string;

  @IsString()
  delay: string;
}

export class FlightOffersPricingDto {
  @ValidateNested()
  @Type(() => FlightOfferPricingDto)
  data: FlightOfferPricingDto;

  @ValidateNested()
  @Type(() => DictionariesDto)
  dictionaries: DictionariesDto;
}

class FlightOfferPricingDto {
  @IsString()
  type: string;

  @ValidateNested({ each: true })
  @Type(() => FlightOfferDto)
  flightOffers: FlightOfferDto[];
}

class DictionariesDto {
  @ValidateNested()
  @Type(() => LocationsDto)
  locations: LocationsDto;
}

class LocationsDto {
  @ValidateNested()
  @Type(() => LocationDto)
  MAD: LocationDto;

  @ValidateNested()
  @Type(() => LocationDto)
  GIG: LocationDto;

  @ValidateNested()
  @Type(() => LocationDto)
  CMN: LocationDto;
}

class LocationDto {
  @IsString()
  cityCode: string;

  @IsString()
  countryCode: string;
}
