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