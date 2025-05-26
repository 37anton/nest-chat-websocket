// src/message/message.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':userId1/:userId2')
  getConversation(@Param('userId1') userId1: string, @Param('userId2') userId2: string) {
    return this.messageService.getConversationBetweenUsers(userId1, userId2);
  }
}
