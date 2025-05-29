import { Controller, Get, Param, Post, Body, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { MessageService } from './message.service';
import { Request } from '@nestjs/common';
import { JwtAuthGuard

 } from 'src/auth/jwt-auth.guard';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Get('conversations/:userId')
  getAllConversations(@Param('userId') userId: string, @Req() req: any) {
    const userIdFromToken = req.user?.userId || req.user?.sub;
    if (userIdFromToken !== userId) {
      throw new BadRequestException("Accès non autorisé");
    }

    return this.messageService.getAllConversationsForUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId1/:userId2')
  getConversation(
    @Param('userId1') userId1: string, 
    @Param('userId2') userId2: string,
    @Req() req: any
  ) {
    const userIdFromToken = req.user?.userId || req.user?.sub;
    if (userIdFromToken!== userId1 && userIdFromToken!== userId2) {
      throw new BadRequestException("Accès non autorisé");
    }
    return this.messageService.getConversationBetweenUsers(userId1, userId2);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('send')
  sendMessage(
    @Body() body: { senderId: string; receiverId: string; content: string },
    @Req() req: any
  ) {
    const userIdFromToken = req.user?.userId || req.user?.sub;
    if (userIdFromToken !== body.senderId) {
      throw new BadRequestException("Accès non autorisé");
    }
    
    return this.messageService.sendMessage(body.senderId, body.receiverId, body.content);
  }

  @UseGuards(JwtAuthGuard)
  @Post('mark-as-read')
  markAsRead(
    @Body() body: { senderId: string; receiverId: string },
    @Req() req: any
  ) {
    const userIdFromToken = req.user?.userId || req.user?.sub;
    if (userIdFromToken !== body.receiverId) {
      throw new BadRequestException("Accès non autorisé");
    }
    
    return this.messageService.markMessagesAsRead(body.senderId, body.receiverId);
  }
}
