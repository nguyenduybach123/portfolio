// @ts-nocheck
import type { UserResponse } from './userResponse';

export interface PaginationResponseUserResponse {
  items?: UserResponse[];
  page?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
  hasNext?: boolean;
  hasPrevious?: boolean;
}
