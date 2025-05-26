import { createContext, useContext, useEffect, useState } from "react"
import { socket } from "@/lib/socket"

interface User {
  id: string
  prenom: string
  nom: string
  country?: string
  color?: string
}

interface OnlineUserContextType {
  currentUser: User | null
  onlineUsers: User[]
}

const OnlineUserContext = createContext<OnlineUserContextType>({
  currentUser: null,
  onlineUsers: [],
})

export const useOnlineUsers = () => useContext(OnlineUserContext)

export const OnlineUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) return

    const parsedUser = JSON.parse(storedUser)
    setCurrentUser(parsedUser)

    socket.io.opts.query = {
      user: JSON.stringify(parsedUser),
    }
    socket.connect()

    socket.on("online-users", (users: User[]) => {
      setOnlineUsers(users)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <OnlineUserContext.Provider value={{ currentUser, onlineUsers }}>
      {children}
    </OnlineUserContext.Provider>
  )
}