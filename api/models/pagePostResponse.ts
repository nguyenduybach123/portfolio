// @ts-nocheck
import type { PageableObject } from './pageableObject';
import type { PostResponse } from './postResponse';
import type { SortObject } from './sortObject';

export interface PagePostResponse {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: PostResponse[];
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
}
