// @ts-nocheck
import type { ApiResponsePaginationResponsePostResponseErrors } from './apiResponsePaginationResponsePostResponseErrors';
import type { PaginationResponsePostResponse } from './paginationResponsePostResponse';

export interface ApiResponsePaginationResponsePostResponse {
  success?: boolean;
  status?: number;
  message?: string;
  errorCode?: string;
  data?: PaginationResponsePostResponse;
  errors?: ApiResponsePaginationResponsePostResponseErrors;
  timestamp?: string;
  traceId?: string;
}
