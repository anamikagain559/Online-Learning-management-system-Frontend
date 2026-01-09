// src/types/user.interface.ts

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IAuthProvider {
  provider: string;
  providerId: string;
}

export interface UserInfo {
  id: string;                 // frontend-friendly (string, not ObjectId)
  name: string;
  email: string;
  phone?: string;
  picture: string;
  bio?: string;
  travelInterests?: string[];
  visitedCountries?: string[];
  currentLocation?: string;
  address?: string;

  role: Role;
  isActive?: IsActive;
  isVerified?: boolean;

  createdAt: string;
  updatedAt: string;
}
