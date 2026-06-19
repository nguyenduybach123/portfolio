// @ts-nocheck
import type { ApiResponseListUserSessionResponseErrors } from './apiResponseListUserSessionResponseErrors';
import type { UserSessionResponse } from './userSessionResponse';

export interface ApiResponseListUserSessionResponse {
  success?: boolean;
  status?: number;
  message?: string;
  errorCode?: string;
  data?: UserSessionResponse[];
  errors?: ApiResponseListUserSessionResponseErrors;
  timestamp?: string;
  traceId?: string;
}
