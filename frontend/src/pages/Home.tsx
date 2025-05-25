import { Button } from "@/components/ui/button"
import { MessageCircle, Users, Globe } from "lucide-react"
import { Link } from "react-router-dom"


export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        {/* Header */}
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
                <Button variant="outline" size="sm">
                    Se connecter
                </Button>
            </nav>
        </header>

        <main className="flex-1">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex flex-col items-center space-y-8 text-center">
                        <div className="space-y-4 max-w-3xl">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Rencontrez des personnes fascinantes
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl lg:text-2xl">
                                Découvrez de nouvelles perspectives, partagez vos idées et créez des connexions authentiques avec des
                                inconnus du monde entier.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                                <MessageCircle className="mr-2 h-5 w-5" />
                                Commencer à chatter
                            </Button>
                            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                                <Users className="mr-2 h-5 w-5" />
                                Voir comment ça marche
                            </Button>
                        </div>

                        <div className="flex items-center gap-8 text-sm text-gray-500 mt-8">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span>2,847 personnes en ligne</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                <span>150+ pays connectés</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        {/* Footer */}
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
                <p className="text-xs text-gray-500">© 2024 ChatConnect. Tous droits réservés.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link to="#" className="text-xs hover:underline underline-offset-4 text-gray-500">
                        Conditions d'utilisation
                    </Link>
                    <Link to="#" className="text-xs hover:underline underline-offset-4 text-gray-500">
                        Confidentialité
                    </Link>
                    <Link to="#" className="text-xs hover:underline underline-offset-4 text-gray-500">
                        Support
                    </Link>
                </nav>
            </footer>
        </div>
    )
}