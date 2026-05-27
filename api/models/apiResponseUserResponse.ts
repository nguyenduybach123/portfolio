// @ts-nocheck
import type { ApiResponseUserResponseErrors } from './apiResponseUserResponseErrors';
import type { UserResponse } from './userResponse';

export interface ApiResponseUserResponse {
  success?: boolean;
  errorCode?: string;
  status?: number;
  message?: string;
  data?: UserResponse;
  errors?: ApiResponseUserResponseErrors;
  timestamp?: number;
  traceId?: string;
}
