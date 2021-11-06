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
  coordinates: string,
  age: number,
  countryCode: string,
  rating: number,
  agencyId: number,
  createdAt: Date,
  updatedAt: Date
}