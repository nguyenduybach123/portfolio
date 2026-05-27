import { CommentResponse } from '@/api/models/commentResponse'

export const mockComments: CommentResponse[] = [
  {
    id: '1',
    content: 'Bài viết rất hay và dễ hiểu.',
    userName: 'Nguyễn Văn An',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    postId: 'post-1',
    createdAt: '2026-05-20T08:30:00Z'
  },
  {
    id: '2',
    content: 'Cảm ơn tác giả đã chia sẻ kiến thức.',
    userName: 'Trần Minh Quân',
    userAvatar: 'https://i.pravatar.cc/150?img=2',
    postId: 'post-1',
    createdAt: '2026-05-20T09:15:00Z'
  },
  {
    id: '3',
    content: 'Cho mình hỏi phần React Query có hỗ trợ SSR không?',
    userName: 'Lê Hoàng Nam',
    userAvatar: 'https://i.pravatar.cc/150?img=3',
    postId: 'post-1',
    createdAt: '2026-05-20T10:00:00Z',
    replies: [
      {
        id: '3-1',
        content: 'Có nhé, TanStack Query hỗ trợ hydration cho SSR.',
        userName: 'Admin',
        userAvatar: 'https://i.pravatar.cc/150?img=10',
        postId: 'post-1',
        parentId: '3',
        createdAt: '2026-05-20T10:15:00Z'
      }
    ]
  },
  {
    id: '4',
    content: 'Mong có thêm ví dụ về Next.js App Router.',
    userName: 'Phạm Tuấn Kiệt',
    userAvatar: 'https://i.pravatar.cc/150?img=4',
    postId: 'post-1',
    createdAt: '2026-05-20T11:20:00Z'
  },
  {
    id: '5',
    content: 'Video hướng dẫn rất chi tiết.',
    userName: 'Võ Gia Huy',
    userAvatar: 'https://i.pravatar.cc/150?img=5',
    postId: 'post-1',
    createdAt: '2026-05-20T12:10:00Z'
  },
  {
    id: '6',
    content: 'Mình đã áp dụng và tối ưu được tốc độ tải trang.',
    userName: 'Đỗ Thanh Bình',
    userAvatar: 'https://i.pravatar.cc/150?img=6',
    postId: 'post-1',
    createdAt: '2026-05-20T13:40:00Z',
    replies: [
      {
        id: '6-1',
        content: 'Tuyệt vời, cảm ơn bạn đã phản hồi.',
        userName: 'Admin',
        userAvatar: 'https://i.pravatar.cc/150?img=10',
        postId: 'post-1',
        parentId: '6',
        createdAt: '2026-05-20T13:55:00Z'
      },
      {
        id: '6-2',
        content: 'Bạn cải thiện được khoảng bao nhiêu phần trăm?',
        userName: 'Nguyễn Quốc Bảo',
        userAvatar: 'https://i.pravatar.cc/150?img=7',
        postId: 'post-1',
        parentId: '6',
        createdAt: '2026-05-20T14:00:00Z'
      }
    ]
  },
  {
    id: '7',
    content: 'Có source code demo không admin?',
    userName: 'Nguyễn Quốc Bảo',
    userAvatar: 'https://i.pravatar.cc/150?img=7',
    postId: 'post-1',
    createdAt: '2026-05-20T15:00:00Z'
  },
  {
    id: '8',
    content: 'Mình thích cách giải thích về caching.',
    userName: 'Bùi Đức Anh',
    userAvatar: 'https://i.pravatar.cc/150?img=8',
    postId: 'post-1',
    createdAt: '2026-05-20T16:20:00Z'
  },
  {
    id: '9',
    content: 'Đang chờ phần tiếp theo về authentication.',
    userName: 'Phan Nhật Minh',
    userAvatar: 'https://i.pravatar.cc/150?img=9',
    postId: 'post-1',
    createdAt: '2026-05-20T17:10:00Z'
  },
  {
    id: '10',
    content: 'Bài viết hữu ích cho người mới học Next.js.',
    userName: 'Lương Khánh Duy',
    userAvatar: 'https://i.pravatar.cc/150?img=11',
    postId: 'post-1',
    createdAt: '2026-05-20T18:30:00Z'
  }
]
