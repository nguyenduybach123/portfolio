// @ts-nocheck
import type { ProjectResponse } from './projectResponse';

export interface PaginationResponseProjectResponse {
  items?: ProjectResponse[];
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
