// @ts-nocheck
import type { ApiResponsePostResponseErrors } from './apiResponsePostResponseErrors';
import type { PostResponse } from './postResponse';

export interface ApiResponsePostResponse {
  success?: boolean;
  errorCode?: string;
  status?: number;
  message?: string;
  data?: PostResponse;
  errors?: ApiResponsePostResponseErrors;
  timestamp?: number;
  traceId?: string;
}
