"use client"

import { Card } from "@/components/ui/card"

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  isOwn: boolean
}

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[70%] ${message.isOwn ? "order-2" : "order-1"}`}>
        <Card
          className={`p-3 ${
            message.isOwn ? "bg-purple-600 text-white border-purple-600" : "bg-white text-gray-900 border-gray-200"
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </Card>
        <p className={`text-xs text-gray-500 mt-1 ${message.isOwn ? "text-right" : "text-left"}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  )
}