// @ts-nocheck
import type { ApiResponsePagePostResponseErrors } from './apiResponsePagePostResponseErrors';
import type { PagePostResponse } from './pagePostResponse';

export interface ApiResponsePagePostResponse {
  success?: boolean;
  errorCode?: string;
  status?: number;
  message?: string;
  data?: PagePostResponse;
  errors?: ApiResponsePagePostResponseErrors;
  timestamp?: number;
  traceId?: string;
}
