// @ts-nocheck
import type { ApiResponseListProjectResponseErrors } from './apiResponseListProjectResponseErrors';
import type { ProjectResponse } from './projectResponse';

export interface ApiResponseListProjectResponse {
  success?: boolean;
  errorCode?: string;
  status?: number;
  message?: string;
  data?: ProjectResponse[];
  errors?: ApiResponseListProjectResponseErrors;
  timestamp?: number;
  traceId?: string;
}
