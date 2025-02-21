import { useAuth } from "../Auth/useAuth"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import { Posts } from "../types/posts.type"
import { CreateNewPosts } from "../types/posts.type"
import { useCallback } from "react"

export const usePosts = (postId?: string, userId?: string) => {
  const baseURL: string = import.meta.env.VITE_BASE_URL
  const { token } = useAuth()
  const queryClient = useQueryClient()

  // GET POSTS
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", postId, userId],
    queryFn: async () => {
      let endpoint = `${baseURL}/posts`

      if (postId) {
        endpoint = `${baseURL}/posts/${postId}`
      } else if (userId) {
        endpoint = `${baseURL}/posts/user/${userId}`
      }

      const response = await axiosInstance.get(endpoint)
      const posts: Posts[] = response.data.data

      return posts
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
      queryClient.invalidateQueries({ queryKey: ["posts"] })
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
      queryClient.invalidateQueries({ queryKey: ["posts", postId] })
    },
    onError: (error) => {
      console.error("Toggle like error: ", error)
      alert("Unexpected error occured, please try again later.")
    },
  })

  // Function for BUTTON LIKE
  const handleToggleLike = useCallback(
    (postId: string) => {
      toggleLike.mutate(postId)
    },
    [toggleLike],
  )

  // CREATE COMMENT
  const createNewComment = useMutation({
    mutationFn: async (body: string) => {
      const response = await axiosInstance.post(
        `${baseURL}/posts/${postId}/comment/create`,
        { body },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId] })
    },
    onError: (error) => {
      console.error("error create new comment: ", error)
      alert("Unexpected error occured, Please try again later.")
    },
  })

  // DELETE POST
  const deletePost = useMutation({
    mutationFn: async (postId: string) => {
      await axiosInstance.delete(`${baseURL}/posts/${postId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId] })
      alert("Delete Post success")
    },
    onError: (error) => {
      console.error("Error delete post: ", error)
      alert("Error while deleting post, Try again later.")
    },
  })

  // DELETE Comment
  const deleteComment = useMutation({
    mutationFn: async (commentId: string) => {
      await axiosInstance.delete(`${baseURL}/posts/comment/${commentId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      alert("Delete Comment success")
    },
    onError: (error) => {
      console.error("Error delete comment: ", error)
      alert("Error while deleting comment, Try again later.")
    },
  })

  return { data, isLoading, isError, error, createPost, toggleLike, handleToggleLike, createNewComment, deletePost, deleteComment }
}
