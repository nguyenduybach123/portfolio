// @ts-nocheck
import type { ApiResponseStringErrors } from './apiResponseStringErrors';

export interface ApiResponseString {
  success?: boolean;
  errorCode?: string;
  status?: number;
  message?: string;
  data?: string;
  errors?: ApiResponseStringErrors;
  timestamp?: number;
  traceId?: string;
}
