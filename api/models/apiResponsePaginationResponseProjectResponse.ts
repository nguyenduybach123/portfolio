// @ts-nocheck
import type { ApiResponsePaginationResponseProjectResponseErrors } from './apiResponsePaginationResponseProjectResponseErrors';
import type { PaginationResponseProjectResponse } from './paginationResponseProjectResponse';

export interface ApiResponsePaginationResponseProjectResponse {
  success?: boolean;
  status?: number;
  message?: string;
  errorCode?: string;
  data?: PaginationResponseProjectResponse;
  errors?: ApiResponsePaginationResponseProjectResponseErrors;
  timestamp?: string;
  traceId?: string;
}
