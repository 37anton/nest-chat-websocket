import { Link } from "react-router-dom"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm">
      <Link to="/" className="flex items-center justify-center">
        <MessageCircle className="h-8 w-8 text-purple-600" />
        <span className="ml-2 text-xl font-bold text-gray-900">ChatConnect</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link to="#features" className="text-sm font-medium hover:text-purple-600 transition-colors">
          Fonctionnalités
        </Link>
        <Link to="#how-it-works" className="text-sm font-medium hover:text-purple-600 transition-colors">
          Comment ça marche
        </Link>
        <Link to="#safety" className="text-sm font-medium hover:text-purple-600 transition-colors">
          Sécurité
        </Link>
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
      </nav>
    </header>
  )
}