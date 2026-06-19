// @ts-nocheck
import type { ApiResponseCommentResponseErrors } from './apiResponseCommentResponseErrors';
import type { CommentResponse } from './commentResponse';

export interface ApiResponseCommentResponse {
  success?: boolean;
  status?: number;
  message?: string;
  errorCode?: string;
  data?: CommentResponse;
  errors?: ApiResponseCommentResponseErrors;
  timestamp?: string;
  traceId?: string;
}
