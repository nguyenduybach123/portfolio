// @ts-nocheck
import type { ApiResponseProjectResponseErrors } from './apiResponseProjectResponseErrors';
import type { ProjectResponse } from './projectResponse';

export interface ApiResponseProjectResponse {
  success?: boolean;
  errorCode?: string;
  status?: number;
  message?: string;
  data?: ProjectResponse;
  errors?: ApiResponseProjectResponseErrors;
  timestamp?: number;
  traceId?: string;
}
