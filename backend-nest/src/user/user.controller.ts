import { Controller, Post, Body, BadRequestException, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from '@nestjs/common';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('Email déjà utilisé');
    }
    const user = await this.userService.register(dto);
    const { password, ...rest } = user;
    return rest;
  }

  @Post('login')
    async login(@Body() dto: LoginDto) {
    return this.userService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/:id/color')
  async updateColor(
    @Param('id') id: string,
    @Body('color') color: string,
    @Req() req: any 
  ) {
    const userIdFromToken = req.user?.userId || req.user?.sub; // selon ta stratégie
    if (userIdFromToken !== id) {
      throw new BadRequestException("Accès non autorisé");
    }
    return this.userService.updateUserColor(id, color);
  }
}