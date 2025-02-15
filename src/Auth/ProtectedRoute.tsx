import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = () => {
  const { user, token, refreshToken } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkToken = async () => {
      try {
        await refreshToken()
      } catch (error) {
        console.error("ProtectedRoute error: ", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkToken()
  }, [])

  if (isLoading) {
    return <div className="text-center pt-10 text-2xl font-bold">Loading ....</div>
  }

  if (!token || !user) {
    setTimeout(() => {
      alert("Unauthorized, login required")
    }, 0)
    return <Navigate to={"/auth"} replace />
  }

  return token && user ? <Outlet /> : null
}
