// @ts-nocheck
import type { UserRole } from './userRole';
import type { UserStatus } from './userStatus';

export interface User {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  email?: string;
  username?: string;
  fullName?: string;
  avatarUrl?: string;
  bio?: string;
  role?: UserRole;
  status?: UserStatus;
}
