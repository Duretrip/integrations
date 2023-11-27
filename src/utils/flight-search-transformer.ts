import { AggregateResponseDto } from "src/flight/dto/flight-response.dto";
import { airlines } from './airlines'

interface Departure {
  iataCode: string;
  terminal?: string;
  at: string;
}

interface Arrival {
  iataCode: string;
  terminal?: string;
  at: string;
}

interface Segment {
  departure: Departure;
  arrival: Arrival;
  carrierCode: string;
  number: string;
  aircraft: {
    code: string;
  };
  operating: {
    carrierCode: string;
  };
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}

interface Itinerary {
  duration: string;
  segments: Segment[];
}

interface Price {
  currency: string;
  total: string;
  base: string;
  fees: {
    amount: string;
    type: string;
  }[];
  grandTotal: string;
}

interface FareDetailsBySegment {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  class: string;
  includedCheckedBags: {
    quantity: number;
  };
}

interface TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: {
    currency: string;
    total: string;
    base: string;
  };
  fareDetailsBySegment: FareDetailsBySegment[];
}

interface AmadeusFlightOffer {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  lastTicketingDate: string;
  lastTicketingDateTime: string;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: Price;
  pricingOptions: {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
  };
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
}


export const transform = (aggregate: AggregateResponseDto, flightOffers: AmadeusFlightOffer[], duretrip_source: string): AggregateResponseDto => {
  if (duretrip_source === 'amadeus') {
    let aggregateCopy = { ...aggregate };
    flightOffers.map((flightOffer, index) => {
      const { itineraries, travelerPricings, lastTicketingDate, price: { grandTotal }, validatingAirlineCodes } = flightOffer;
      const { duration, segments } = itineraries[0];
      aggregateCopy.data.push({
        duration,
        segments,
        travelerPricings,
        price: grandTotal,
        lastTicketingDate,
        duretrip_source
      })

      // get from airline dictionary json file
      for (const airlineCode of validatingAirlineCodes) {
        const airline = airlines.find(airline => airline.code === airlineCode);
        if (airline) {
          // Use the "name" property as the value in the result object
          aggregateCopy.dictionary.carriers[airlineCode] = airline;
        }
      }
    });

    return aggregateCopy;
  }
  return null
};