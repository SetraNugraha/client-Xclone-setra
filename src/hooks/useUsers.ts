import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"

export const useUsers = (userId?: string) => {
  const baseURL = import.meta.env.VITE_BASE_URL
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

  return { data, isLoading, refetch }
}
