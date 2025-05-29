import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ChatGateway } from 'src/chat/chat.gateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'votre_secret_jwt',
      signOptions: { expiresIn: '7d' },
    })
  ],
  providers: [UserService, ChatGateway],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserModule {}