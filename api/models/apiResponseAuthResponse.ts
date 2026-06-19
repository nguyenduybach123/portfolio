// @ts-nocheck
import type { ApiResponseAuthResponseErrors } from './apiResponseAuthResponseErrors';
import type { AuthResponse } from './authResponse';

export interface ApiResponseAuthResponse {
  success?: boolean;
  status?: number;
  message?: string;
  errorCode?: string;
  data?: AuthResponse;
  errors?: ApiResponseAuthResponseErrors;
  timestamp?: string;
  traceId?: string;
}
