import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../lib/axios"
import { AxiosError } from "axios"

interface User {
  userId: string
  username: string
  email: string
  profileImage: string
  birthday: string
  exp: number
}

interface LoginPayload {
  email: string
  password: string
}

interface LoginInputError {
  path: string
  message: string
}

interface IAuthContext {
  login: (payload: LoginPayload) => Promise<User | undefined>
  refreshToken: () => Promise<string | null>
  logout: () => Promise<void>
  setLoginState: Dispatch<SetStateAction<{ isLoading: boolean; hasError: LoginInputError }>>
  user: User | null
  token: string | null
  loginState: { isLoading: boolean; hasError: LoginInputError }
}

interface AuthContextProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<IAuthContext | null>(null)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loginState, setLoginState] = useState<{ isLoading: boolean; hasError: LoginInputError }>({
    isLoading: false,
    hasError: { path: "", message: "" },
  })

  const login = async (payload: LoginPayload): Promise<User | undefined> => {
    setLoginState((prevState) => ({ ...prevState, isLoading: true }))
    try {
      const response = await axiosInstance.post("/auth/login", payload)
      const accessToken = response.data.accessToken
      const decodeDataUser = jwtDecode<User>(accessToken)
      setToken(accessToken)
      setUser(decodeDataUser)

      return decodeDataUser
    } catch (error) {
      if (error instanceof AxiosError) {
        // Network error
        if (!error.response) {
          console.error("Network error: ", error.message)
          alert("Network error! please check your internet connection.")
          return
        }

        // Error based on status
        const { status, data } = error.response
        console.error(`Error ${status}: `, data)

        if (status === 403) {
          throw new Error("Unauthorized")
        } else if (status === 500) {
          throw new Error("Internal server error")
        }

        // User Input Error
        if (data?.path && data?.message) {
          setLoginState((prevState) => ({
            ...prevState,
            hasError: {
              path: data.path,
              message: data.message,
            },
          }))
        }
      } else {
        console.error("Unexpected error: ", error)
        throw new Error("Something went wrong! Please try again later.")
      }
    } finally {
      setLoginState((prevState) => ({ ...prevState, isLoading: false }))
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await axiosInstance.delete(`/auth/logout/${user?.userId}`)

      setToken(null)
      setUser(null)
    } catch (error) {
      console.error("logout error: ", error)
      if (error instanceof AxiosError) {
        if (!error.response) {
          console.error("Network error: ", error.message)
          alert("Network error! please check your internet connection.")
          return
        } else {
          throw new Error(error.message)
        }
      }

      console.error("Unexpected error: ", error)
      throw new Error("Something went wrong! Please try again later.")
    }
  }

  const refreshToken = async (): Promise<string | null> => {
    try {
      const response = await axiosInstance.get("/auth/refreshToken")
      const newToken = response.data.accessToken
      const decodeUserData = jwtDecode<User>(newToken)

      setToken(newToken)
      setUser(decodeUserData)

      return newToken
    } catch (error) {
      console.error("refreshToken error: ", error)
      if (error instanceof AxiosError) {
        if (!error.response) {
          console.error("Network error: ", error.message)
          alert("Network error! please check your internet connection.")
          return null
        } else {
          throw new Error(error.message)
        }
      }

      console.error("Unexpected error: ", error)
      throw new Error("Something went wrong! Please try again later.")
    }
  }

  // Handle Expired Token
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const currentDate = new Date()
        const expired = user?.exp

        if (expired && expired * 1000 < currentDate.getTime()) {
          try {
            const newToken = await refreshToken()
            if (newToken) {
              config.headers.Authorization = `Bearer ${newToken}`
            } else if (token) {
              config.headers.Authorization = `Bearer ${token}`
            }
          } catch (error) {
            if (error instanceof AxiosError && error.response) {
              console.error("Interceptor error: ", error)
              navigate("/auth")
            }
          }
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    return () => {
      axiosInstance.interceptors.request.eject(interceptor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user?.exp])

  const value: IAuthContext = { user, token, loginState, setLoginState, login, refreshToken, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
