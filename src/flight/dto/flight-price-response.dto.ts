// flight-offers-pricing-response.dto.ts

export class FlightOffersPricingResponseDTO {
  data: {
    type: string;
    flightOffers: FlightOffer[];
  };
  dictionaries: {
    locations: Record<string, Location>;
  };
}

export class Location {
  cityCode: string;
  countryCode: string;
}

export class FlightOffer {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  lastTicketingDate: string;
  itineraries: Itinerary[];
  price: Price;
  pricingOptions: PricingOptions;
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
  paymentCardRequired: boolean;
}

export class Itinerary {
  segments: Segment[];
}

export class Segment {
  departure: {
    iataCode: string;
    terminal?: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    terminal?: string;
    at: string;
  };
  carrierCode: string;
  number: string;
  aircraft: {
    code: string;
  };
  operating: {
    carrierCode: string;
  };
  id: string;
  numberOfStops: number;
  duration: string;
}

export class Price {
  currency: string;
  total: string;
  base: string;
  fees: Fee[];
  grandTotal: string;
  billingCurrency: string;
}

export class Fee {
  amount: string;
  type: string;
}

export class PricingOptions {
  fareType: string[];
  includedCheckedBagsOnly: boolean;
}

export class TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: Price;
  fareDetailsBySegment: FareDetails[];
}

export class FareDetails {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  class: string;
  includedCheckedBags: {
    quantity: number;
  };
}
