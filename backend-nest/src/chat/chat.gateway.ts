import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from 'src/message/message.entity';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers: { socketId: string; user: any }[] = [];

  handleConnection(socket: Socket) {
    const user = socket.handshake.query.user;
    if (!user) return;
  
    const parsed = JSON.parse(user as string);
  
    // Supprimer toute entrée précédente de ce user.id
    this.connectedUsers = this.connectedUsers.filter(
      (u) => u.user.id !== parsed.id
    );
  
    // Ajouter la connexion fraîche
    this.connectedUsers.push({ socketId: socket.id, user: parsed });
  
    console.log(`User ${parsed.id} (nouvelle connexion)`);
    this.server.emit('user-connected', parsed);
    this.emitUsers();
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
    console.log("utilisateurs connectés envoyés depuis le back : ", users);
    console.log("coucou");
    this.server.emit('online-users', users);
  }

  sendMessageToReceiver(message: Message) {
    this.server.emit(`new-message-${message.receiver.id}`, {
      id: message.id,
      senderId: message.sender.id,
      receiverId: message.receiver.id,
      content: message.content,
      createdAt: message.createdAt,
      read: message.read,
      sender: {
        id: message.sender.id,
        prenom: message.sender.prenom,
        nom: message.sender.nom,
        color: message.sender.color
      }
    });
  }

  emitRefreshConversations(userId: string) {
    this.server.emit(`refresh-conversations-${userId}`);
  }
}