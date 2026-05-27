// @ts-nocheck

export interface CommentResponse {
  id?: string;
  content?: string;
  userName?: string;
  userAvatar?: string;
  postId?: string;
  parentId?: string;
  replies?: CommentResponse[];
  createdAt?: string;
}
