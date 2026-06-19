// @ts-nocheck
import type { ApiResponseListCommentResponseErrors } from './apiResponseListCommentResponseErrors';
import type { CommentResponse } from './commentResponse';

export interface ApiResponseListCommentResponse {
  success?: boolean;
  status?: number;
  message?: string;
  errorCode?: string;
  data?: CommentResponse[];
  errors?: ApiResponseListCommentResponseErrors;
  timestamp?: string;
  traceId?: string;
}
