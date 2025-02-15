import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthContextProvider } from "./Auth/AuthContext"
import { ProtectedRoute } from "./Auth/ProtectedRoute"
import Auth from "./pages/Auth"
import Homepage from "./pages/Homepage"
import Profile from "./pages/Profile"
import DetailPost from "./pages/DetailPost"

export default function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path={"/auth"} element={<Auth />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path={"/"} element={<Homepage />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"/detail-post"} element={<DetailPost />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </Router>
  )
}
