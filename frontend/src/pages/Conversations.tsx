"use client"

import { useEffect, useState, useRef } from "react"
import { io, Socket } from "socket.io-client"
import { MessageCircle } from "lucide-react"
import ConversationCard from "@/components/conversation-card"
import Navbar from "@/components/Navbar"

interface Conversation {
  userId: string
  firstName: string
  lastName: string
  lastMessage: string
  lastMessageTime: Date
  isOnline: boolean
  unreadCount: number
  lastMessageFromMe: boolean
}

export default function ConversationsInterface() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const socketRef = useRef<Socket | null>(null)
  const userRef = useRef<any>(null)

  // Fonction pour charger les conversations
  const fetchConversations = async () => {
    const storedUser = localStorage.getItem("user")
    const currentUser = storedUser ? JSON.parse(storedUser) : null
    if (!currentUser) return

    userRef.current = currentUser

    const res = await fetch(`http://localhost:3000/messages/conversations/${currentUser.id}`)
    const data = await res.json()

    const formatted = data.map((conv: any, index: number) => ({
      userId: conv.userId,
      firstName: conv.firstName,
      lastName: conv.lastName,
      avatar: "/placeholder.svg?height=60&width=60",
      lastMessage: conv.lastMessage,
      lastMessageTime: new Date(conv.lastMessageTime),
      lastMessageFromMe: conv.lastMessageFromMe,
      unreadCount: conv.unreadCount,
      isOnline: conv.isOnline,
      isTyping: false,
    }))

    setConversations(formatted)
  }

  useEffect(() => {
    fetchConversations()

    const storedUser = localStorage.getItem("user")
    const currentUser = storedUser ? JSON.parse(storedUser) : null
    if (!currentUser) return

    const socket = io("http://localhost:3000", {
      query: {
        user: JSON.stringify(currentUser),
      },
    })

    socketRef.current = socket

    socket.on(`new-message-${currentUser.id}`, (message: any) => {
      console.log("🔔 Nouveau message reçu :", message)
      fetchConversations()
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const currentUser = storedUser ? JSON.parse(storedUser) : null
    if (!currentUser) return
  
    const socket = io("http://localhost:3000", {
      query: {
        user: JSON.stringify(currentUser),
      },
    })
  
    socket.on(`new-message-${currentUser.id}`, () => {
      fetchConversations()
    })
  
    socket.on(`refresh-conversations-${currentUser.id}`, () => {
      fetchConversations()
    })
  
    return () => {
      socket.disconnect()
    }
  }, [])  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 py-3">Mes conversations</h1>

          {conversations.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Aucune conversation</h3>
              <p className="text-gray-600 mb-6">
                Commencez à discuter avec des personnes pour voir vos conversations ici
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <ConversationCard key={conversation.userId} conversation={conversation} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}