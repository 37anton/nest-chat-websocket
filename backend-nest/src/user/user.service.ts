import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ChatGateway } from 'src/chat/chat.gateway';
import { JwtService } from '@nestjs/jwt';

export interface LoggedInUser {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginResponse {
  access_token: string;
  user: LoggedInUser;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private chatGateway: ChatGateway,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async login(dto: LoginDto): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new BadRequestException('Email invalide');
    }

    const isValid = await user.validatePassword(dto.password);
    if (!isValid) {
      throw new BadRequestException('Mot de passe invalide');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    const userInfo: LoggedInUser = {
      id: user.id,
      email: user.email,
      nom: user.nom,
      prenom: user.prenom,
      color: user.color,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return { access_token: token, user: userInfo };
  }

  async updateUserColor(userId: string, newColor: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error("Utilisateur non trouvé");
  
    user.color = newColor;
    await this.userRepository.save(user);
  
    this.chatGateway.emitColorChange(userId, newColor);
  }  
}