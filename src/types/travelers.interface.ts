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

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  picture?: string; // make optional if sometimes missing
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
