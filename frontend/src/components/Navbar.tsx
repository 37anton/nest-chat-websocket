import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsLoggedIn(!!user)
  }, [])

  const handleLogout = () => {
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
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        {isLoggedIn ? (
          <>
            <Link to="/conversations">
              <Button variant="outline" size="sm">
                  Mes conversations
                </Button>
            </Link>
            <Link to="/online">
              <Button variant="outline" size="sm">
                  Voir les persones connectées
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