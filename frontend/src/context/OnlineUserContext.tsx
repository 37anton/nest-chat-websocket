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
  setCurrentUser: (user: User | null) => void
}

const OnlineUserContext = createContext<OnlineUserContextType>({
  currentUser: null,
  onlineUsers: [],
  setCurrentUser: () => {},
})

export const useOnlineUsers = () => useContext(OnlineUserContext)

export const OnlineUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUserState] = useState<User | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])

  // Fonction utilisée partout pour définir le currentUser et connecter socket
  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user)
    if (user) {
      socket.io.opts.query = {
        user: JSON.stringify(user),
      }
      if (!socket.connected) {
        socket.connect()
        console.log("🔌 Socket connecté via setCurrentUser()")
      }
    } else {
      socket.disconnect()
    }
  }

  useEffect(() => {
    // Tentative de récupération auto au chargement
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
    }

    // Listeners socket.io
    socket.on("online-users", (users: User[]) => {
      setOnlineUsers(users)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <OnlineUserContext.Provider value={{ currentUser, onlineUsers, setCurrentUser }}>
      {children}
    </OnlineUserContext.Provider>
  )
}