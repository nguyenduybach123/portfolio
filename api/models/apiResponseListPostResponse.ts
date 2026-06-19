// @ts-nocheck
import type { ApiResponseListPostResponseErrors } from './apiResponseListPostResponseErrors';
import type { PostResponse } from './postResponse';

export interface ApiResponseListPostResponse {
  success?: boolean;
  status?: number;
  message?: string;
  errorCode?: string;
  data?: PostResponse[];
  errors?: ApiResponseListPostResponseErrors;
  timestamp?: string;
  traceId?: string;
}
