// @ts-nocheck
import type { ApiResponseProjectResponseErrors } from './apiResponseProjectResponseErrors';
import type { ProjectResponse } from './projectResponse';

export interface ApiResponseProjectResponse {
  success?: boolean;
  status?: number;
  message?: string;
  errorCode?: string;
  data?: ProjectResponse;
  errors?: ApiResponseProjectResponseErrors;
  timestamp?: string;
  traceId?: string;
}
