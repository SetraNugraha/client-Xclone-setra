export interface Posts {
  date: string
  body: string
  postImage: string | null
  comments: number
  repost: number
  likes: number
  views: number
}

export interface Data {
  name: string
  username: string
  profileImage: string
  posts: Posts[]
}
