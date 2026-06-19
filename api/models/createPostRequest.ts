// @ts-nocheck

export interface CreatePostRequest {
  title: string;
  summary?: string;
  content: string;
  thumbnail?: string;
  tags?: string[];
  featured?: boolean;
}
