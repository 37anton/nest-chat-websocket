"use client"

import { MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import ConversationCard from "@/components/conversation-card"
import Navbar from "@/components/Navbar"

// Fausses données de conversations
const mockConversations = [
  {
    id: "1",
    userId: "2",
    firstName: "Marco",
    lastName: "Rossi",
    avatar: "/placeholder.svg?height=60&width=60",
    lastMessage:
      "J'adore me promener dans le centre historique, surtout le soir quand il y a moins de touristes. Et la cuisine bien sûr ! 🍝",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // Il y a 5 minutes
    isOnline: true,
    unreadCount: 0,
    isTyping: false,
    lastMessageFromMe: false,
  },
  {
    id: "2",
    userId: "3",
    firstName: "Emma",
    lastName: "Johnson",
    avatar: "/placeholder.svg?height=60&width=60",
    lastMessage: "Merci pour cette super conversation ! À bientôt 😊",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // Il y a 30 minutes
    isOnline: true,
    unreadCount: 2,
    isTyping: true,
    lastMessageFromMe: false,
  },
  {
    id: "3",
    userId: "4",
    firstName: "Hiroshi",
    lastName: "Tanaka",
    avatar: "/placeholder.svg?height=60&width=60",
    lastMessage: "D'accord, on se reparle demain alors !",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // Il y a 2 heures
    isOnline: false,
    unreadCount: 0,
    isTyping: false,
    lastMessageFromMe: true,
  },
  {
    id: "4",
    userId: "5",
    firstName: "Ana",
    lastName: "Silva",
    avatar: "/placeholder.svg?height=60&width=60",
    lastMessage: "Wow, le Brésil a l'air incroyable ! J'aimerais vraiment y aller un jour",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 4), // Il y a 4 heures
    isOnline: false,
    unreadCount: 1,
    isTyping: false,
    lastMessageFromMe: true,
  },
  {
    id: "5",
    userId: "6",
    firstName: "Alex",
    lastName: "Smith",
    avatar: "/placeholder.svg?height=60&width=60",
    lastMessage: "Salut ! Comment ça va ?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 6), // Il y a 6 heures
    isOnline: true,
    unreadCount: 0,
    isTyping: false,
    lastMessageFromMe: false,
  },
  {
    id: "6",
    userId: "7",
    firstName: "Fatima",
    lastName: "El Amrani",
    avatar: "/placeholder.svg?height=60&width=60",
    lastMessage: "C'était un plaisir de discuter avec toi !",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // Il y a 1 jour
    isOnline: false,
    unreadCount: 0,
    isTyping: false,
    lastMessageFromMe: false,
  },
  {
    id: "7",
    userId: "8",
    firstName: "Lars",
    lastName: "Andersson",
    avatar: "/placeholder.svg?height=60&width=60",
    lastMessage: "La Suède en hiver, c'est magique avec toute cette neige ❄️",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // Il y a 2 jours
    isOnline: false,
    unreadCount: 0,
    isTyping: false,
    lastMessageFromMe: false,
  },
  {
    id: "8",
    userId: "9",
    firstName: "Priya",
    lastName: "Sharma",
    avatar: "/placeholder.svg?height=60&width=60",
    lastMessage: "Namaste ! Ravi de faire ta connaissance",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // Il y a 3 jours
    isOnline: true,
    unreadCount: 0,
    isTyping: false,
    lastMessageFromMe: false,
  },
]

export default function ConversationsInterface() {
  const totalUnread = mockConversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">

      <Navbar />

      <div className="container mx-auto px-4 py-6">
        {/* Liste des conversations */}
        <div className="max-w-4xl mx-auto">

				<h1 className="text-2xl font-bold text-gray-900 py-3">Mes conversations</h1>

          {mockConversations.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Aucune conversation</h3>
              <p className="text-gray-600 mb-6">
                Commencez à discuter avec des personnes pour voir vos conversations ici
              </p>
              <Link to="/users">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium">
                  Trouver des personnes
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {mockConversations.map((conversation) => (
                <ConversationCard key={conversation.id} conversation={conversation} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}