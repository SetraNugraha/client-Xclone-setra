import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Auth from "./pages/Auth"
import Homepage from "./pages/Homepage"
import Profile from "./pages/Profile"
import DetailPost from "./pages/DetailPost"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/auth"} element={<Auth />} />
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/detail-post"} element={<DetailPost />} />
      </Routes>
    </Router>
  )
}
