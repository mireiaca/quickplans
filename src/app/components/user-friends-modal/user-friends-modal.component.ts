import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService, User } from '../../services/user/user.service';
import { GroupService } from '../../services/group/group.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-friends-modal',
  templateUrl: './user-friends-modal.component.html',
})
export class UserFriendsModalComponent implements OnInit {
  userFriends: User[] = [];
  usersInGroup: string[] = [];
  idGroup: string;
  members!: User[];  

  //Estilos
  contentBgColor = '#117C6F';
  white = '#FFFFFF';
  none = 'none';
  auto = 'auto';
  inline = 'inline-block';
  nameColumnStyle = { flex: '1', 'font-size': '16px', color: '#333', 'margin-left': '10px' };
  symbolColumnStyle = {
    'min-width': '30px',
    'height': '30px',
    'text-align': 'center',
    cursor: 'pointer',
    'margin': '5px',
    color: '#fff',
    'font-size': '20px',
    'font-weight': 'bold',
    border: '2px solid #117C6F',
    'border-radius': '50%',
    'background-color': '#117C6F',
    transition: 'background-color 0.3s, color 0.3s'
  };

  constructor(
    public dialogRef: MatDialogRef<UserFriendsModalComponent>,
    private userService: UserService,
    private groupService: GroupService,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    this.idGroup = data.idGroup; 
  }

  ngOnInit(): void {
    this.getMembers();
    this.checkUserInGroup();
  }

  deleteUser(username: string): void {
    this.groupService.deleteUserFromGroup(this.idGroup, username).subscribe(() => {
      this.getMembers();
      this.checkUserInGroup();
    });
  }

  addUser(username: string): void {
    this.groupService.addUserToGroup(this.idGroup, username).subscribe(() => {
      this.getMembers();
      this.checkUserInGroup();
    });
  }

  getMembers(): void {
    this.groupService?.getUsersFromGroup(this.idGroup).subscribe(members => {
      this.members = members;
    });
  }

  checkUserInGroup(): void {
    if (this.idGroup) {
      this.groupService.getUsersFromGroup(this.idGroup).subscribe((users: User[]) => {
        this.usersInGroup = users.map((user: User) => user.Username);
        this.loadFriends();
      });
    } else {
      this.loadFriends();
    }
  }

  loadFriends(): void {
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
        uuid: user.uid || '',
        id: user.id || ''
      })).filter((user: User) => !this.usersInGroup.includes(user.Username));
    });
  }

  close(): void {
    this.dialogRef.close();
    window.location.reload();
  }
}