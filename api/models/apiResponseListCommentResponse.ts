// @ts-nocheck
import type { ApiResponseListCommentResponseErrors } from './apiResponseListCommentResponseErrors';
import type { CommentResponse } from './commentResponse';

export interface ApiResponseListCommentResponse {
  success?: boolean;
  errorCode?: string;
  status?: number;
  message?: string;
  data?: CommentResponse[];
  errors?: ApiResponseListCommentResponseErrors;
  timestamp?: number;
  traceId?: string;
}
