import { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { io, Socket } from "socket.io-client"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const navigate = useNavigate()
  const socketRef = useRef<Socket | null>(null)
  const userRef = useRef<any>(null)

  const fetchUnreadCount = async () => {
    const storedUser = localStorage.getItem("user")
    const currentUser = storedUser ? JSON.parse(storedUser) : null
    if (!currentUser) return

    userRef.current = currentUser

    const res = await fetch(`http://localhost:3000/messages/conversations/${currentUser.id}`)
    const data = await res.json()

    const count = data.filter((conv: any) => conv.unreadCount > 0).length
    setUnreadCount(count)
  }

  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsLoggedIn(!!user)
    fetchUnreadCount()

    if (user) {
      const currentUser = JSON.parse(user)

      const socket = io("http://localhost:3000", {
        query: {
          user: JSON.stringify(currentUser),
        },
      })

      socketRef.current = socket
      userRef.current = currentUser

      // Quand un message est reçu => recharger le badge
      socket.on(`new-message-${currentUser.id}`, () => {
        fetchUnreadCount()
      })

      return () => {
        socket.disconnect()
      }
    }
  }, [])

  const handleLogout = () => {
    socketRef.current?.disconnect()
    
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    navigate("/login")
  }

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm">
      <Link to="/" className="flex items-center justify-center">
        <MessageCircle className="h-8 w-8 text-purple-600" />
        <span className="ml-2 text-xl font-bold text-gray-900">ChatConnect</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center relative">
        {isLoggedIn ? (
          <>
            <Link to="/conversations" className="relative">
              <Button variant="outline" size="sm">
                Mes conversations
              </Button>
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>
            <Link to="/online">
              <Button variant="outline" size="sm">
                Voir les personnes connectées
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Se déconnecter
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="outline" size="sm">
                Se connecter
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="sm">
                S'inscrire
              </Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}