// @ts-nocheck
import type { ApiResponseVoidData } from './apiResponseVoidData';
import type { ApiResponseVoidErrors } from './apiResponseVoidErrors';

export interface ApiResponseVoid {
  success?: boolean;
  status?: number;
  message?: string;
  errorCode?: string;
  data?: ApiResponseVoidData;
  errors?: ApiResponseVoidErrors;
  timestamp?: string;
  traceId?: string;
}
