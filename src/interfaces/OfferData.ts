export interface offerData {
  title: string,
  userId: string,
  description: string,
  category: string,
  furnished: boolean,
  area: string,
  floor: string,
  numberOfRooms: string,
  price: string,
  currency: string,
  negotiable: boolean,
  offerType: string,
  coordinates: {
    lat: number | null,
    lng: number | null
  },
  address: string
}

export interface offerFilters {
  priceLow: number | null,
  priceHigh: number | null,
  areaLow: number | null,
  areaHigh: number | null,
  offerType: string | null,
  category: string | null,
  furnished: boolean | null,
  floor: number | null,
  numberOfRooms: number | null,
  negotiable: boolean | null,
  address: string | null
}