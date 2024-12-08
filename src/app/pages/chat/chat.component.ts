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
    
  }

  setActiveChat() {

  }
}
