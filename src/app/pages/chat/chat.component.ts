import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  userFriends: User[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getMyFriends().subscribe((users: any[]) => { 
      this.userFriends = users.map((user: any) => ({ 
        field_nombre: user.username || '',
        Nombre: user.name || '', 
        Username: user.username || '', 
        Imagen: user.image || '', 
        Biografia: '', 
        Intereses: '', 
        Localidad: '', 
        Email: '',
        Amigos: user.field_amigos || null, 
        uuid: user.uid || '',
        id: user.id || ''
      }));
    });

    this.scrollToBottom();
  }

  // Selected chat 
  activeChat: string = '';

  isActive(chat: string): boolean {
    return this.activeChat === chat;
  }

  setActiveChat(chat: string): void {
    this.activeChat = chat;
  }
  
  // Función para desplazar el scroll hacia abajo
  scrollToBottom():void {
    const chatBody = document.querySelector('.chat-body');
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }
}
