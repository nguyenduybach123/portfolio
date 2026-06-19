// @ts-nocheck
import type { ApiResponseUUIDErrors } from './apiResponseUUIDErrors';

export interface ApiResponseUUID {
  success?: boolean;
  status?: number;
  message?: string;
  errorCode?: string;
  data?: string;
  errors?: ApiResponseUUIDErrors;
  timestamp?: string;
  traceId?: string;
}
