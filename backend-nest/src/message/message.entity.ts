import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  read: boolean;

  @ManyToOne(() => User, user => user.messagesSent, { onDelete: 'CASCADE' })
  sender: User;

  @ManyToOne(() => User, user => user.messagesReceived, { onDelete: 'CASCADE' })
  receiver: User;
}