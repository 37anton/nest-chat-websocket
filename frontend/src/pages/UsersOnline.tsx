// src/pages/UsersOnline.tsx
"use client"

import { useEffect, useState } from "react"
import { socket } from "@/lib/socket"
import Navbar from "@/components/Navbar"
import UserCard from "@/components/user-card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

const storedUser = localStorage.getItem("user");
const currentUser = storedUser ? JSON.parse(storedUser) : null;

export default function UsersOnlineInterface() {
  const [onlineUsers, setOnlineUsers] = useState<any[]>([])

  useEffect(() => {
		if (!currentUser) return
	
		// Injecte les infos du user dans la requête de connexion
		socket.io.opts.query = {
			user: JSON.stringify(currentUser),
		}
	
		// Connecte au WebSocket
		socket.connect()
	
		// Écoute les utilisateurs en ligne
		socket.on("online-users", (users) => {
			console.log("Utilisateurs en ligne:", users)
			setOnlineUsers(users)
		})
	
		// Nettoyage à la fermeture de l'onglet ou du composant
		return () => {
			socket.disconnect()
		}
	}, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navbar />
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">Utilisateurs en ligne</h1>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            {Math.max(onlineUsers.length - 1, 0)} en ligne
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{onlineUsers
					.filter((user) => user.id !== currentUser?.id)
					.map((user) => (
						<UserCard key={user.id} user={user} />
				))}
        </div>
      </div>
    </div>
  )
}