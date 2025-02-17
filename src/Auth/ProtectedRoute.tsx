/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useAuth } from "./useAuth"
import { Outlet, useNavigate } from "react-router-dom"

export const ProtectedRoute = () => {
  const navigate = useNavigate()
  const { token, refreshToken } = useAuth()

  useEffect(() => {
    if (!token) {
      refreshToken().catch((error) => {
        console.error("Protected Route error: ", error)
        alert("Unauthorized, Login required.")
        navigate("/auth", { replace: true })
      })
    }
  }, [token])

  return token ? <Outlet /> : null
}
