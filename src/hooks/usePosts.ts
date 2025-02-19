import { useAuth } from "../Auth/useAuth"
import { useQuery, useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import { Posts } from "../types/posts.type"
import { CreateNewPosts } from "../types/posts.type"

export const usePosts = (postId?: string, userId?: string) => {
  const { token } = useAuth()
  const baseURL: string = import.meta.env.VITE_BASE_URL

  // GET POSTS
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["posts", postId, userId],
    queryFn: async () => {
      let endpoint = `${baseURL}/posts`

      if (postId) {
        endpoint = `${baseURL}/posts/${postId}`
      }

      if (userId) {
        endpoint = `${baseURL}/posts/user/${userId}`
      }

      try {
        const response = await axiosInstance.get(endpoint)
        const posts: Posts[] = response.data.data
        return posts
      } catch (error) {
        console.error("fetch post error: ", error)
        return []
      }
    },
  })

  // CREATE POSTS
  const createPost = useMutation({
    mutationFn: async (payload: CreateNewPosts) => {
      const response = await axiosInstance.post(`${baseURL}/posts/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      return response
    },
    onSuccess: () => {
      refetch()
    },
    onError: (error) => {
      console.error("create posts error: ", error)
    },
  })

  return { data, isLoading, refetch, createPost }
}
