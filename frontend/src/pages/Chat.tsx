"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useLocation, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, MoreVertical, Phone, Video, Smile } from "lucide-react"
import MessageBubble from "@/components/message-bubble"

export default function ChatInterface() {
  const { userId } = useParams()
  const location = useLocation()
  const [messages, setMessages] = useState<any[]>([])
  const [chatUser, setChatUser] = useState<any>(location.state?.user || null)
  const [newMessage, setNewMessage] = useState("")
  const [otherUserTyping, setOtherUserTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const currentUser = storedUser ? JSON.parse(storedUser) : null

    if (!currentUser || !userId) return

    fetch(`http://localhost:3000/messages/${currentUser.id}/${userId}`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((msg: any) => ({
          id: msg.id,
          senderId: msg.sender.id,
          senderName: `${msg.sender.prenom} ${msg.sender.nom}`,
          content: msg.content,
          timestamp: new Date(msg.createdAt),
          isOwn: msg.sender.id === currentUser.id,
        }))
        setMessages(formatted)

        // Si on n’a pas reçu l’utilisateur via location.state, on le récupère depuis les messages
        if (!chatUser && data.length > 0) {
          const other =
            data.find((m: any) => m.sender.id !== currentUser.id)?.sender ||
            data.find((m: any) => m.receiver.id !== currentUser.id)?.receiver
          setChatUser(other)
        }
      })
      .catch(console.error)
  }, [userId])

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return
  
    const storedUser = localStorage.getItem("user")
    const currentUser = storedUser ? JSON.parse(storedUser) : null
    if (!currentUser || !chatUser) return
  
    const contentToSend = newMessage.trim()
    setNewMessage("")
  
    const optimisticMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: "Moi",
      content: contentToSend,
      timestamp: new Date(),
      isOwn: true,
    }
    setMessages(prev => [...prev, optimisticMessage])
  
    try {
      await fetch("http://localhost:3000/messages/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: currentUser.id,
          receiverId: chatUser.id,
          content: contentToSend,
        }),
      })
    } catch (err) {
      console.error("Erreur envoi message :", err)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/online" className="text-purple-600 hover:text-purple-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-purple-600">
              {chatUser?.prenom?.charAt(0) || "?"}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">
                {chatUser?.prenom || "Utilisateur"} {chatUser?.nom || ""}
              </h1>
              {otherUserTyping ? (
                <div className="flex items-center gap-1 text-xs text-purple-600">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-purple-600 rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-purple-600 rounded-full animate-bounce delay-100" />
                    <div className="w-1 h-1 bg-purple-600 rounded-full animate-bounce delay-200" />
                  </div>
                  <span className="ml-1">En train d'écrire...</span>
                </div>
              ) : (
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                  En ligne
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white/90 backdrop-blur-sm border-t p-4">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message..."
              className="resize-none"
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ""}
            className="bg-purple-600 hover:bg-purple-700 text-white"
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}