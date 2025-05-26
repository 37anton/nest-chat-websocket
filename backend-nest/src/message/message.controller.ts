import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('conversations/:userId')
  getAllConversations(@Param('userId') userId: string) {
    return this.messageService.getAllConversationsForUser(userId);
  }

  @Get(':userId1/:userId2')
  getConversation(@Param('userId1') userId1: string, @Param('userId2') userId2: string) {
    return this.messageService.getConversationBetweenUsers(userId1, userId2);
  }
  
  @Post('send')
  sendMessage(@Body() body: { senderId: string; receiverId: string; content: string }) {
    return this.messageService.sendMessage(body.senderId, body.receiverId, body.content);
  }

  @Post('mark-as-read')
  markAsRead(@Body() body: { senderId: string; receiverId: string }) {
    return this.messageService.markMessagesAsRead(body.senderId, body.receiverId);
  }
}
