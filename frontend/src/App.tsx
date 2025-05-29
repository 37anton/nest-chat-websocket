import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UsersOnline from "./pages/UsersOnline"
import Conversations from "./pages/Conversations"
import ChatInterface from "./pages/Chat"
import { OnlineUserProvider } from "./context/OnlineUserContext"
import PrivateRoute from "./components/PrivateRoute"

export default function App() {
  return (
    <OnlineUserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes protégées */}
        <Route
          path="/online"
          element={
            <PrivateRoute>
              <UsersOnline />
            </PrivateRoute>
          }
        />
        <Route
          path="/conversations"
          element={
            <PrivateRoute>
              <Conversations />
            </PrivateRoute>
          }
        />
        <Route
          path="/conversations/:userId"
          element={
            <PrivateRoute>
              <ChatInterface />
            </PrivateRoute>
          }
        />
      </Routes>
    </OnlineUserProvider>
  )
}