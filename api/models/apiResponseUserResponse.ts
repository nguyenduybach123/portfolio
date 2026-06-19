// @ts-nocheck
import type { ApiResponseUserResponseErrors } from './apiResponseUserResponseErrors';
import type { UserResponse } from './userResponse';

export interface ApiResponseUserResponse {
  success?: boolean;
  status?: number;
  message?: string;
  errorCode?: string;
  data?: UserResponse;
  errors?: ApiResponseUserResponseErrors;
  timestamp?: string;
  traceId?: string;
}
