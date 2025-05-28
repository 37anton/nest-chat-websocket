import { Controller, Post, Body, BadRequestException, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

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

  @Patch('users/:id/color')
  async updateColor(@Param('id') id: string, @Body('color') color: string) {
    return this.userService.updateColor(id, color);
  }
}