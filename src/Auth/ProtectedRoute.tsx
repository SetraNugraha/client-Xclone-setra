/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useAuth } from "./useAuth"
import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const ProtectedRoute = () => {
  const { token, refreshToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      refreshToken().catch(() => {
        console.error("Failed to refresh token, redirecting to /auth")
        navigate("/auth", { replace: true }) // Redirect if Fail
      })
    }
  }, [token])

  return token ? <Outlet /> : null
}
