import RegisterForm from "@/components/register-form"
import { Link } from "react-router-dom"
import Navbar from "@/components/Navbar"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col">
      
      <Navbar />

      {/* Contenu principal */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Rejoignez-nous !</h1>
              <p className="text-gray-600">Créez votre compte et commencez à rencontrer des personnes fascinantes</p>
            </div>

            <RegisterForm />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Déjà un compte ?{" "}
                <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>

          {/* Informations supplémentaires */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              En créant un compte, vous acceptez nos{" "}
              <Link to="/terms" className="underline hover:text-gray-700">
                Conditions d'utilisation
              </Link>{" "}
              et notre{" "}
              <Link to="/privacy" className="underline hover:text-gray-700">
                Politique de confidentialité
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}