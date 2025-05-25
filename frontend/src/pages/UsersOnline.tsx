"use client"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import { Link } from "react-router-dom"
import UserCard from "@/components/user-card"
import Navbar from "@/components/Navbar"

// Fausses données d'utilisateurs connectés (simplifiées)
const mockUsers = [
  {
    id: "1",
    firstName: "Sophie",
    lastName: "Martin",
    country: "France",
    status: "online",
    isTyping: false,
  },
  {
    id: "2",
    firstName: "Marco",
    lastName: "Rossi",
    country: "Italie",
    status: "online",
    isTyping: true,
  },
  {
    id: "3",
    firstName: "Emma",
    lastName: "Johnson",
    country: "Canada",
    status: "online",
    isTyping: false,
  },
  {
    id: "4",
    firstName: "Hiroshi",
    lastName: "Tanaka",
    country: "Japon",
    status: "online",
    isTyping: false,
  },
  {
    id: "5",
    firstName: "Ana",
    lastName: "Silva",
    country: "Brésil",
    status: "online",
    isTyping: false,
  },
  {
    id: "6",
    firstName: "Alex",
    lastName: "Smith",
    country: "États-Unis",
    status: "online",
    isTyping: false,
  },
  {
    id: "7",
    firstName: "Fatima",
    lastName: "El Amrani",
    country: "Maroc",
    status: "online",
    isTyping: false,
  },
  {
    id: "8",
    firstName: "Lars",
    lastName: "Andersson",
    country: "Suède",
    status: "online",
    isTyping: false,
  },
  {
    id: "9",
    firstName: "Priya",
    lastName: "Sharma",
    country: "Inde",
    status: "online",
    isTyping: false,
  },
  {
    id: "10",
    firstName: "Diego",
    lastName: "García",
    country: "Espagne",
    status: "online",
    isTyping: false,
  },
]

export default function UsersOnlineInterface() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">

      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-900">Utilisateurs en ligne</h1>
              </div>
            </div>

            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              {mockUsers.length} en ligne
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Liste des utilisateurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}