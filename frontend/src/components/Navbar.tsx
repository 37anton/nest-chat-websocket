import { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { io, Socket } from "socket.io-client"
import { MessageCircle, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ColorPickerDialog from "./ColorPickerDialog"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

      socket.on(`refresh-conversations-${currentUser.id}`, () => {
        fetchUnreadCount()
      })

      return () => {
        socket.disconnect()
      }
    }
  }, [])

  const [openColorDialog, setOpenColorDialog] = useState(false)

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

      {/* Menu Burger pour Mobile */}
      <button
        className="ml-auto lg:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      <nav className={`${isMobileMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row absolute lg:relative top-16 lg:top-0 left-0 right-0 bg-white lg:bg-transparent p-4 lg:p-0 border-b lg:border-0 gap-4 lg:gap-6 items-center lg:ml-auto`}>
        {isLoggedIn ? (
          <>
            <Link to="/conversations" className="relative w-full lg:w-auto">
              <Button size="sm" className="w-full lg:w-auto hover:bg-gray-200 bg-gray-100">
                Mes conversations
              </Button>
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>
            <Link to="/online" className="w-full lg:w-auto">
              <Button size="sm" className="w-full lg:w-auto hover:bg-gray-200 bg-gray-100">
                Voir les personnes connectées
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg cursor-pointer">
                  {userRef.current.prenom?.charAt(0).toUpperCase() || "?"}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white">
                <DropdownMenuLabel className="text-sm font-semibold">
                  {userRef.current.prenom} {userRef.current.nom}
                </DropdownMenuLabel>
                <DropdownMenuGroup className="hover:bg-gray-100 hover:text-gray-900">
                <DropdownMenuItem onClick={() => setOpenColorDialog(true)}>
                  Couleur préférée
                </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem onClick={handleLogout} className="hover:bg-gray-100 hover:text-gray-900">
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link to="/login" className="w-full lg:w-auto">
              <Button size="sm" className="w-full lg:w-auto hover:bg-gray-200 bg-gray-100">
                Se connecter
              </Button>
            </Link>
            <Link to="/register" className="w-full lg:w-auto">
              <Button size="sm" className="w-full lg:w-auto hover:bg-gray-200 bg-gray-100">
                S'inscrire
              </Button>
            </Link>
          </>
        )}
      </nav>
      <ColorPickerDialog open={openColorDialog} onOpenChange={setOpenColorDialog} />
    </header>
  )
}