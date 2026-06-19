// @ts-nocheck
import type { ApiResponsePaginationResponseUserResponseErrors } from './apiResponsePaginationResponseUserResponseErrors';
import type { PaginationResponseUserResponse } from './paginationResponseUserResponse';

export interface ApiResponsePaginationResponseUserResponse {
  success?: boolean;
  status?: number;
  message?: string;
  errorCode?: string;
  data?: PaginationResponseUserResponse;
  errors?: ApiResponsePaginationResponseUserResponseErrors;
  timestamp?: string;
  traceId?: string;
}
