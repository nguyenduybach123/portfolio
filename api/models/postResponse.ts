// @ts-nocheck
import type { PostResponseStatus } from './postResponseStatus';

export interface PostResponse {
  id?: string;
  title?: string;
  slug?: string;
  summary?: string;
  content?: string;
  thumbnail?: string;
  status?: PostResponseStatus;
  featured?: boolean;
  viewCount?: number;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  commentCount?: number;
}
