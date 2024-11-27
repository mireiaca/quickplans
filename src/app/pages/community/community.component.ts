import { Component, Injectable, OnInit } from '@angular/core';
import { Group, GroupService } from '../../services/group/group.service'; 
import { environment } from '../../../environments/environment';
import { UserService, User } from '../../services/user/user.service';


@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})


export class CommunityComponent implements OnInit {
  userGroups: Group[] = [];
  userFriends: User[] = [];
  environment = environment;

  goToGroupPage(nid: string): void {
    window.location.href = `/group/${nid}`;
  }

  goToUserPage(username: string): void {
    window.location.href = `/user-profile/${username}`;
  }

  constructor(
    private groupService: GroupService, 
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.groupService.getUserGroups().subscribe(groups => {
      this.userGroups = groups;
    });

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
        Amigos: null, 
        uuid: user.uid || ''
      }));
    });
    
  }

  activeMenu: string = 'Amigos';

  isActive(menu: string): boolean {
    return this.activeMenu === menu;
  }

  setActiveMenu(menu: string): void {
    this.activeMenu = menu;
  }
}
