// src/message/message.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { User } from '../user/user.entity';
import { ChatGateway } from 'src/chat/chat.gateway';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly chatGateway: ChatGateway,
  ) {}

  async getConversationBetweenUsers(userId1: string, userId2: string): Promise<Message[]> {
    return this.messageRepository.find({
      where: [
        { sender: { id: userId1 }, receiver: { id: userId2 } },
        { sender: { id: userId2 }, receiver: { id: userId1 } },
      ],
      order: {
        createdAt: 'ASC',
      },
      relations: ['sender', 'receiver'],
    });
  }

  async getAllConversationsForUser(userId: string): Promise<any[]> {
    const messages = await this.messageRepository.find({
      where: [
        { sender: { id: userId } },
        { receiver: { id: userId } },
      ],
      relations: ['sender', 'receiver'],
      order: { createdAt: 'DESC' },
    });
  
    const conversationsMap = new Map<string, any>();
  
    for (const msg of messages) {
      const otherUser = msg.sender.id === userId ? msg.receiver : msg.sender;
      const isFromMe = msg.sender.id === userId;
  
      if (!conversationsMap.has(otherUser.id)) {
        conversationsMap.set(otherUser.id, {
          userId: otherUser.id,
          firstName: otherUser.prenom,
          lastName: otherUser.nom,
          lastMessage: msg.content,
          lastMessageTime: msg.createdAt,
          lastMessageFromMe: isFromMe,
          unreadCount: 0,
          isOnline: false,
        });
      }
  
      // Incrémente si le message est non lu et vient de l'autre utilisateur
      if (!isFromMe && !msg.read) {
        conversationsMap.get(otherUser.id).unreadCount++;
      }
    }
  
    return Array.from(conversationsMap.values()).sort((a, b) =>
      b.lastMessageTime.getTime() - a.lastMessageTime.getTime()
    );
  }  

  async sendMessage(senderId: string, receiverId: string, content: string): Promise<Message> {
    const message = this.messageRepository.create({
      sender: { id: senderId },
      receiver: { id: receiverId },
      content,
      createdAt: new Date(),
      read: false,
    });
  
    const savedMessage = await this.messageRepository.save(message);
  
    // Recharger le message avec les relations complètes (sender + receiver)
    const fullMessage = await this.messageRepository.findOne({
      where: { id: savedMessage.id },
      relations: ['sender', 'receiver'],
    });
  
    if (fullMessage) {
      this.chatGateway.sendMessageToReceiver(fullMessage);
    }
  
    if (!fullMessage) {
      throw new Error("Message non trouvé après sauvegarde.");
    }
    return fullMessage;
    
  }
  

  async markMessagesAsRead(senderId: string, receiverId: string): Promise<void> {
    await this.messageRepository
      .createQueryBuilder()
      .update()
      .set({ read: true })
      .where("senderId = :senderId", { senderId })
      .andWhere("receiverId = :receiverId", { receiverId })
      .andWhere("read = false")
      .execute();
    
    // Notify receiver to refresh their UI
    this.chatGateway.emitRefreshConversations(receiverId);
  }  
}