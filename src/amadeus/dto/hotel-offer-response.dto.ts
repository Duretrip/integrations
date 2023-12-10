export class HotelOfferResponseDto {
  meta: {
      count?: number;
  };
  data: HotelDTO[];
  dictionaries: {};
}

interface RateFamilyEstimatedDTO {
  code: string;
  type: string;
}

interface RoomTypeEstimatedDTO {
  category: string;
  beds: number;
  bedType: string;
}

interface RoomDescriptionDTO {
  text: string;
  lang: string;
}

interface RoomDTO {
  type: string;
  typeEstimated: RoomTypeEstimatedDTO;
  description: RoomDescriptionDTO;
}

interface GuestDTO {
  adults: number;
}

interface PriceVariationDTO {
  base: string;
}

interface PriceChangeDTO {
  startDate: string;
  endDate: string;
  total: string;
}

interface PriceDTO {
  currency: string;
  base: string;
  total: string;
  variations: {
      average: PriceVariationDTO;
      changes: PriceChangeDTO[];
  };
}

interface CancellationDescriptionDTO {
  text: string;
}

interface CancellationDTO {
  description: CancellationDescriptionDTO;
  type: string;
}

interface OfferDTO {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  rateCode: string;
  rateFamilyEstimated: RateFamilyEstimatedDTO;
  room: RoomDTO;
  guests: GuestDTO;
  price: PriceDTO;
  policies: {
      paymentType: string;
      cancellation: CancellationDTO;
  };
  self: string;
}

export interface HotelDTO {
  type: string;
  hotel: {
      type: string;
      hotelId: string;
      chainCode: string;
      dupeId: string;
      name: string;
      cityCode: string;
      latitude: number;
      longitude: number;
  };
  available: boolean;
  offers: OfferDTO[];
  self?: string;
}

