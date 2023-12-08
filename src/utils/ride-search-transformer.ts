import { AggregateRideResponseDto } from "src/ride/dto/ride-response.dto";

interface LocationDTO {
  line: string;
  zip: string;
  countryCode: string;
  cityName: string;
  latitude: number;
  longitude: number;
}

interface StopOverLocationDTO extends LocationDTO {
  locationCode: string;
}

interface StopOverDTO {
  duration: string;
  sequenceNumber: number;
  location: StopOverLocationDTO;
}

interface SeatsDTO {
  count: number;
}

interface BaggageDTO {
  count: number;
  size: string;
}

interface VehicleDTO {
  code: string;
  category: string;
  description: string;
  seats: SeatsDTO[];
  baggages: BaggageDTO[];
  imageURL: string;
}

interface ContactsDTO {
  phoneNumber: string;
  email: string;
}

interface ServiceProviderDTO {
  code: string;
  name: string;
  logoUrl: string;
  termsUrl: string;
  contacts: ContactsDTO;
  settings: string[];
}

interface QuotationDTO {
  monetaryAmount: string;
  currencyCode: string;
  isEstimated: boolean;
  base: {
      monetaryAmount: string;
  };
  discount: {
      monetaryAmount: string;
  };
  fees: {
      indicator: string;
      monetaryAmount: string;
  }[];
  totalTaxes: {
      monetaryAmount: string;
  };
  totalFees: {
      monetaryAmount: string;
  };
}

interface ExtraServiceDTO {
  code: string;
  itemId: string;
  description: string;
  quotation: QuotationDTO;
  converted: QuotationDTO;
  isBookable: boolean;
  taxIncluded: boolean;
  includedInTotal: boolean;
}

interface EquipmentDTO extends ExtraServiceDTO {}

interface CancellationRuleDTO {
  feeType: string;
  feeValue: string;
  metricType: string;
  metricMin: string;
  metricMax: string;
}

interface DistanceDTO {
  value: number;
  unit: string;
}

interface ConnectedSegmentDTO {
  transportationType: string;
  transportationNumber: string;
  departure: {
      localDateTime: string;
      iataCode: string;
  };
  arrival: {
      localDateTime: string;
      iataCode: string;
  };
}

interface PassengerCharacteristicsDTO {
  passengerTypeCode: string;
  age: number;
}

interface TransferOfferDTO {
  type: string;
  id: string;
  transferType: string;
  start: {
      dateTime: string;
      locationCode: string;
  };
  end: {
      address: LocationDTO;
      googlePlaceId: string;
      name: string;
  };
  stopOvers: StopOverDTO[];
  vehicle: VehicleDTO;
  serviceProvider: ServiceProviderDTO;
  quotation: QuotationDTO;
  converted: QuotationDTO;
  extraServices: ExtraServiceDTO[];
  equipment: EquipmentDTO[];
  cancellationRules: CancellationRuleDTO[];
  methodsOfPaymentAccepted: string[];
  discountCodes: {
      type: string;
      value: string;
  }[];
  distance: DistanceDTO;
  startConnectedSegment: ConnectedSegmentDTO;
  passengerCharacteristics: PassengerCharacteristicsDTO[];
}

interface WarningDTO {
  code: number;
  title: string;
  detail: string;
  source: {
      pointer: string;
      parameter: string;
  };
}

interface AmadeusRideResponseDTO {
  data: TransferOfferDTO[];
  warnings: WarningDTO[];
}



export const transform = (aggregate: AggregateRideResponseDto, rideOffers: AmadeusRideResponseDTO, duretrip_source: string): AggregateRideResponseDto => {
  if (duretrip_source === 'amadeus') {
    let aggregateCopy = { ...aggregate };
    rideOffers.data.map((rideOffer, index) => {
      const { type, id, startConnectedSegment, transferType, start, end, stopOvers, vehicle, serviceProvider, quotation, converted, extraServices, equipment, cancellationRules, methodsOfPaymentAccepted, discountCodes, distance, passengerCharacteristics } = rideOffer;
      aggregateCopy.data.push({
        transferType, start, end, stopOvers, vehicle, serviceProvider, quotation, converted, extraServices, equipment, cancellationRules, methodsOfPaymentAccepted, discountCodes, distance, passengerCharacteristics,
        type,
        id,
        startConnectedSegment
      })
    });
    return aggregateCopy;
  }
  return null
};