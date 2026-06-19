// @ts-nocheck
import type { PostResponse } from './postResponse';

export interface PaginationResponsePostResponse {
  items?: PostResponse[];
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
