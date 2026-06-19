// @ts-nocheck
import type { ApiResponseMediaResponseErrors } from './apiResponseMediaResponseErrors';
import type { MediaResponse } from './mediaResponse';

export interface ApiResponseMediaResponse {
  success?: boolean;
  status?: number;
  message?: string;
  errorCode?: string;
  data?: MediaResponse;
  errors?: ApiResponseMediaResponseErrors;
  timestamp?: string;
  traceId?: string;
}
