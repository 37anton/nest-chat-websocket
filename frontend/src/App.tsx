import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UsersOnline from "./pages/UsersOnline"
import Conversations from "./pages/Conversations"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/online" element={<UsersOnline />} />
      {/* <Route path="/conversations/:userId" element={<ChatWindow />} /> */}
      <Route path="/conversations" element={<Conversations />} />
    </Routes>
  )
}