import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UsersOnline from "./pages/UsersOnline"
import Conversations from "./pages/Conversations"
import ChatInterface from "./pages/Chat"
import { OnlineUserProvider } from "./context/OnlineUserContext"

export default function App() {
  return (
    <OnlineUserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/online" element={<UsersOnline />} />
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/conversations/:userId" element={<ChatInterface />} />
      </Routes>
    </OnlineUserProvider>
  )
}