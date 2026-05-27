// @ts-nocheck
import type { SortObject } from './sortObject';

export interface PageableObject {
  offset?: number;
  sort?: SortObject;
  unpaged?: boolean;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
}
