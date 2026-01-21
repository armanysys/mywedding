export interface Address {
  line1: string;
  line2?: string;
  city?: string;
  postalCode?: string;
}

export interface TransportOption {
  mode: string;
  details: string;
}

export interface HotelRecommendation {
  name: string;
  details: string;
  price?: string;
}

export interface DressCodeColor {
  name: string;
  hex?: string;
}

export interface Logistics {
  title: string;
  intro: string;
  isDressCodeVisible: boolean | false;
  dressCode: {
    code: string;
    details: string;
    colors: DressCodeColor[];
  };
  isVenueVisible: boolean | false;
  venue: {
    name: string;
    address: Address;
    mapUrl: string;
    parkingInfo?: string;
  };
  isTransportVisible: boolean | false;
  transport: TransportOption[];
  isHotelsVisible: boolean | false;
  hotels: HotelRecommendation[];
}
