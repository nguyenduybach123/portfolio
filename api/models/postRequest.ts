// @ts-nocheck
import type { PostRequestStatus } from './postRequestStatus';

export interface PostRequest {
  title: string;
  summary?: string;
  content: string;
  thumbnail?: string;
  status?: PostRequestStatus;
  featured?: boolean;
  tags?: string[];
}
