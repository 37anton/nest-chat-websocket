"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, MapPin } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface User {
  id: string
  prenom: string
  nom: string
  country: string
  status: string
  isTyping: boolean
}

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  const navigate = useNavigate()

  const handleStartChat = () => {
    navigate(`/conversations/${user.id}`, {
      state: {
        user,
      },
    })
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden group">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-purple-600">
            {user?.prenom?.charAt(0) || "?"}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-gray-900">
              {user.prenom} {user.nom}
            </h3>

            <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>
                {user.country}
              </span>
            </div>
          </div>

          {/* Action */}
          <Button onClick={handleStartChat} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chatter
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}