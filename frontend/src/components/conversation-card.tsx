"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, CheckCheck } from "lucide-react"
import { Link } from "react-router-dom"

interface Conversation {
  id: string
  userId: string
  firstName: string
  lastName: string
  avatar: string
  lastMessage: string
  lastMessageTime: Date
  isOnline: boolean
  unreadCount: number
  isTyping: boolean
  lastMessageFromMe: boolean
}

interface ConversationCardProps {
  conversation: Conversation
}

export default function ConversationCard({ conversation }: ConversationCardProps) {
  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInMinutes < 1) return "À l'instant"
    if (diffInMinutes < 60) return `${diffInMinutes}min`
    if (diffInHours < 24) return `${diffInHours}h`
    if (diffInDays === 1) return "Hier"
    if (diffInDays < 7) return `${diffInDays}j`
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
  }

  const truncateMessage = (message: string, maxLength = 60) => {
    if (message.length <= maxLength) return message
    return message.substring(0, maxLength) + "..."
  }

  return (
    <Link to={`/conversations/${conversation.userId}`}>
      <Card className="hover:shadow-md transition-all duration-200 border-0 shadow-sm hover:bg-white/80 cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            {/* Avatar avec indicateur de statut */}
            <div className="relative flex-shrink-0">
							<div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg">
								{conversation.firstName.charAt(0)}
							</div>
							{conversation.isOnline && (
								<div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
							)}
						</div>

            {/* Contenu de la conversation */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 truncate">
                  {conversation.firstName} {conversation.lastName}
                </h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-gray-500">{formatTime(conversation.lastMessageTime)}</span>
                  {conversation.unreadCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full"
                    >
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Indicateur de message lu/non lu pour mes messages */}
                {conversation.lastMessageFromMe && (
                  <div className="flex-shrink-0">
                    {conversation.unreadCount === 0 ? (
                      <CheckCheck className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Check className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                )}

                {/* Contenu du message */}
                <div className="flex-1 min-w-0">
                  {conversation.isTyping ? (
                    <div className="flex items-center gap-1 text-purple-600">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-purple-600 rounded-full animate-bounce"></div>
                        <div
                          className="w-1 h-1 bg-purple-600 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-1 h-1 bg-purple-600 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm ml-1">En train d'écrire...</span>
                    </div>
                  ) : (
                    <p
                      className={`text-sm truncate ${
                        conversation.unreadCount > 0 ? "font-medium text-gray-900" : "text-gray-600"
                      }`}
                    >
                      {conversation.lastMessageFromMe && "Vous: "}
                      {truncateMessage(conversation.lastMessage)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}