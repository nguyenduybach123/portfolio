// @ts-nocheck
import type { ApiResponsePostResponseErrors } from './apiResponsePostResponseErrors';
import type { PostResponse } from './postResponse';

export interface ApiResponsePostResponse {
  success?: boolean;
  status?: number;
  message?: string;
  errorCode?: string;
  data?: PostResponse;
  errors?: ApiResponsePostResponseErrors;
  timestamp?: string;
  traceId?: string;
}
