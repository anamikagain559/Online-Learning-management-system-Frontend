// src/types/user.interface.ts

export enum Role {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
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
  address?: string;
  travelInterests?: string[];
  visitedCountries?: string[];
  currentLocation?: string;

  role: Role;
  isActive?: IsActive;
  isVerified?: boolean;
  needPasswordChange?: boolean;

  createdAt: string;
  updatedAt: string;
}

