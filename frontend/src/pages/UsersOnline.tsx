"use client"

import Navbar from "@/components/Navbar"
import UserCard from "@/components/user-card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import { useOnlineUsers } from "@/context/OnlineUserContext"

export default function UsersOnlineInterface() {
  const { onlineUsers, currentUser } = useOnlineUsers()

  const filteredUsers = onlineUsers.filter(
    (user) => user.id !== currentUser?.id
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Utilisateurs en ligne</h1>

          <Badge variant="secondary" className="bg-green-100 text-green-800 flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>{filteredUsers.length} en ligne</span>
          </Badge>
        </div>
      </div>
     
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}