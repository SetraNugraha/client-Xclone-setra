import { useAuth } from "../Auth/useAuth"
import { useQuery, useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import { Posts } from "../types/posts.type"
import { CreateNewPosts } from "../types/posts.type"
import { useCallback } from "react"

export const usePosts = (postId?: string, userId?: string) => {
  const baseURL: string = import.meta.env.VITE_BASE_URL
  const { token } = useAuth()

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

  // LIKE UNLIKE POSTS
  const toggleLike = useMutation({
    mutationFn: async (postId: string) => {
      const response = await axiosInstance.post(`${baseURL}/posts/${postId}/toggleLike`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    },
    onSuccess: () => {
      refetch()
    },
    onError: (error) => {
      console.error("Toggle like error: ", error)
    },
  })

  const handleToggleLike = useCallback(
    (postId: string) => {
      try {
        toggleLike.mutate(postId)
      } catch (error) {
        console.error("handle toggle like error: ", error)
        alert("Unexpected error occured, please try again later.")
      }
    },
    [toggleLike],
  )

  return { data, isLoading, refetch, createPost, toggleLike, handleToggleLike }
}
