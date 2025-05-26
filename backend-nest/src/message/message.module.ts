import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { ChatGateway } from 'src/chat/chat.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageService, ChatGateway],
  controllers: [MessageController],
  exports: [TypeOrmModule],
})
export class MessageModule {}