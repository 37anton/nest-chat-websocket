// src/message/message.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { User } from '../user/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
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
      const otherUser =
        msg.sender.id === userId ? msg.receiver : msg.sender;
  
      if (!conversationsMap.has(otherUser.id)) {
        conversationsMap.set(otherUser.id, {
          userId: otherUser.id,
          firstName: otherUser.prenom,
          lastName: otherUser.nom,
          lastMessage: msg.content,
          lastMessageTime: msg.createdAt,
          lastMessageFromMe: msg.sender.id === userId,
          unreadCount: 0, // à améliorer plus tard
          isOnline: false, // à synchroniser avec les utilisateurs en ligne plus tard
        });
      }
    }
  
    return Array.from(conversationsMap.values());
  }
}