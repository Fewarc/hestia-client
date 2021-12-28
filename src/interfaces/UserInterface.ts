enum UserRole {
  USER = 'user',
  AGENT = 'agent',
  AGENCY = 'agency'
}

export interface UserType {
  id: number,
  login: string,
  email: string,
  role: UserRole,
  firstName: string,
  lastName: string,
  address: string,
  lat: number,
  lng: number,
  age: number,
  countryCode: string,
  rating: number,
  agencyId: number,
  createdAt: Date,
  updatedAt: Date
}