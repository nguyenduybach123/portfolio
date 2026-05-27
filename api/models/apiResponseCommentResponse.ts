// @ts-nocheck
import type { ApiResponseCommentResponseErrors } from './apiResponseCommentResponseErrors';
import type { CommentResponse } from './commentResponse';

export interface ApiResponseCommentResponse {
  success?: boolean;
  errorCode?: string;
  status?: number;
  message?: string;
  data?: CommentResponse;
  errors?: ApiResponseCommentResponseErrors;
  timestamp?: number;
  traceId?: string;
}
