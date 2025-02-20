interface UserPostsDTO {
  name: string
  username: string
  profileImage: string | null
}

interface Comments {
  id: string
  userId: string
  postId: string
  body: string
  created_at: string
  updated: string
  user: UserPostsDTO
}

export interface Posts {
  id: string
  userId: string
  body: string
  postImage: string | null
  created_at: string
  updated: string
  user: UserPostsDTO
  like: [{ userId: string }]
  comment: Comments[] | null
  _count: { like: number; comment: number }
}

export interface CreateNewPosts {
  body: string
  postImage: File | null
}
