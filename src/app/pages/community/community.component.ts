import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Group, GroupService } from '../../services/group/group.service'; 
import { environment } from '../../../environments/environment';
import { UserService, User } from '../../services/user/user.service';
import { InfoModalComponent } from '../../components/info-modal/info-modal.component';


@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})

export class CommunityComponent implements OnInit {
  userGroups: Group[] = [];
  userFriends: User[] = [];
  environment = environment;
  addUsers: string[] = [];
  allUsers: User[] = [];
  
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private groupService: GroupService
  ) {}

  // Modales 
  createdGroupModal(): void {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      data: {
        title: 'Información',
        content: 'Grupo creado correctamente'
      }
    });
  }

  errorCreatedGroupModal(): void {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      data: {
        title: 'Error',
        content: 'El grupo ha de tener un nombre'
      }
    });
  }

  goToGroupPage(nid: string): void {
    window.location.href = `/group/${nid}`;
  }

  goToUserPage(username: string): void {
    window.location.href = `/user-profile/${username}`;
  }

  addUserToGroup(): void {
    const selectElement = document.querySelector('select');
    if(selectElement && !this.addUsers.includes(selectElement.value) && selectElement.selectedIndex !== 0) {
      this.addUsers.push(selectElement?.value || '');
      selectElement.selectedIndex = 0;
    };
  }

  filterUsers() {
    const input = document.getElementById('search') as HTMLInputElement || { value: '' };
    /* console.log(input.value); */
    this.allUsers = this.allUsers.filter(user => user.Nombre.toLowerCase().includes(input.value.toLowerCase()));
    /* console.log(this.allUsers); */
  }

  deleteUser(user: string): void {
    this.addUsers = this.addUsers.filter(u => u !== user);
  }

  cancelGroup(): void {
    (document.getElementById('group-name') as HTMLInputElement).value = '';
    this.addUsers = [];
  }

  saveGroup(): void {
    const groupTitle = document.getElementById('group-name') as HTMLInputElement;
    if(groupTitle && groupTitle.value.length !== 0) {
      this.addUsers.push(localStorage.getItem('username') || '');
      this.groupService.createGroupWithUsers(groupTitle.value, this.addUsers).subscribe(() => {
        this.addUsers = [];
        this.groupService.getUserGroups().subscribe((groups: Group[]) => {
          this.userGroups = groups;
        });
      });
      this.createdGroupModal();
      this.addUsers = [];
      (document.getElementById('group-name') as HTMLInputElement).value = '';
      document.querySelector('select')?.setAttribute('selectedIndex', '0');
    } else {
      this.errorCreatedGroupModal();
    }
  }

  addFriend(username: string): void {
    this.userService.addFriend(username);
  }

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
        Amigos: user.field_amigos || null, 
        uuid: user.uid || '',
        id: user.id || ''
      }));

      this.userService.getAllUsers().subscribe((users: User[]) => {
        const friendUsernames = this.userFriends.map(friend => friend.Username);
        const currentUsername = localStorage.getItem('username');
      
        this.allUsers = users.filter(user => 
          user.Nombre !== currentUsername &&    
          user.Nombre !== 'admin' &&           
          !friendUsernames.includes(user.Nombre) 
        );
      });
    });
    
  }

  // Selected menu 
  activeMenu: string = 'Amigos';

  isActive(menu: string): boolean {
    return this.activeMenu === menu;
  }

  setActiveMenu(menu: string): void {
    this.activeMenu = menu;
  }
}
