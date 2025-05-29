import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ChatGateway } from 'src/chat/chat.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, ChatGateway],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserModule {}