import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers: { socketId: string; user: any }[] = [];

  handleConnection(socket: Socket) {
    const user = socket.handshake.query.user;
    if (user) {
      const parsed = JSON.parse(user as string);
      this.connectedUsers.push({ socketId: socket.id, user: parsed });
      this.server.emit('user-connected', parsed);
      this.emitUsers();
    }
  }

  handleDisconnect(socket: Socket) {
    const disconnected = this.connectedUsers.find(u => u.socketId === socket.id);
    this.connectedUsers = this.connectedUsers.filter(u => u.socketId !== socket.id);
    if (disconnected) {
      this.server.emit('user-disconnected', disconnected.user);
      this.emitUsers();
    }
  }

  private emitUsers() {
    const users = this.connectedUsers.map(u => u.user);
    this.server.emit('online-users', users);
  }
}