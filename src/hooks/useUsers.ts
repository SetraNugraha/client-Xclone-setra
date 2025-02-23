import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import { useAuth } from "../Auth/useAuth"
import { AxiosError } from "axios"

export const useUsers = (userId?: string) => {
  const { token } = useAuth()
  const baseURL = import.meta.env.VITE_BASE_URL
  const queryClient = useQueryClient()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", userId],
    queryFn: async () => {
      let endpoint = `${baseURL}/users`
      if (userId) {
        endpoint = `${baseURL}/users/${userId}`
      }

      try {
        const response = await axiosInstance.get(endpoint)
        const users = response.data.data || []
        return users
      } catch (error) {
        console.error("get user error: ", error)
        return []
      }
    },
  })

  const updateProfileImage = useMutation({
    mutationFn: async (profileImage: File) => {
      await axiosInstance.put(
        `${baseURL}/users/profileImage/update`,
        { profileImage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", userId] })
      alert("Update profile image success.")
    },
    onError: (error) => {
      console.error("Update profile image error: ", error)
      if (error instanceof AxiosError) {
        const errResponse = error.response?.data
        alert(errResponse.message)
        return
      }
      alert("Unexpected error occured, Please try again later.")
    },
  })

  const deleteProfileImage = useMutation({
    mutationFn: async () => {
      await axiosInstance.put(
        `${baseURL}/users/profileImage/delete`,
        { profileImage: null },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", userId] })
      alert("Delete profile image success")
    },
    onError: (error) => {
      console.error("Delete profile image error: ", error)
      if (error instanceof AxiosError) {
        const errResponse = error.response?.data
        alert(errResponse.message)
        return
      }
      alert("Unexpected error occured, Please try again later.")
    },
  })

  return { data, isLoading, refetch, updateProfileImage, deleteProfileImage }
}
