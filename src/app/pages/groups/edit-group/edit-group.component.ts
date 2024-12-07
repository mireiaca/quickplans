import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group, GroupService } from './../../../services/group/group.service';
import { User, UserService } from './../../../services/user/user.service';
import { InfoModalComponent } from '../../../components/info-modal/info-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { LoadImagesService } from '../../../services/images/load-images.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrl: './edit-group.component.scss'
})
export class EditGroupComponent implements OnInit {
  idGroup: string = '';
  group: Group = { Titulo: '', Imagen: '', field_miembros: '', nid: '' };
  members!: User[];  
  userFriends: User[] = [];
  usersInGroup: string[] = [];
  addUsers: string[] = [];
  idImagen: string = 'img-null';

  constructor(
    private route: ActivatedRoute, 
    private groupService: GroupService,
    private userService: UserService,
    private dialog: MatDialog,
    private loadImagesService: LoadImagesService
  ) {}

  cancel(): void {
    window.location.href = '/group/' + this.idGroup;
  }

  createdGroupModal(title: string, message: string): void {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      data: {
        title: title,
        content: message
      }
    });
  }

  uploadImageFunction(): void {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
      fileInput.onchange = () => {
        const file = fileInput.files?.[0];
        if (file) {
          this.loadImagesService.uploadImage(file).then((response: any) => {
            this.idImagen = response.file_uuid;
          });
          this.createdGroupModal('Información', 'Imagen subida correctamente');
        } else {
          this.idImagen = 'img-null';
          this.createdGroupModal('Error', 'Error al subir la imagen');
        }
      };
    }
  }

  saveGroup(): void {
    if (this.group && this.group.Titulo) {
      const usuarios = [...this.members.map(member => member.Username), ...this.addUsers];
      this.groupService.editGroup(this.idGroup, this.group.Titulo, usuarios, this.idImagen).subscribe(() => {
        window.location.href = '/group/' + this.idGroup;
      });
      this.createdGroupModal('Información', 'Grupo actualizado correctamente');
      /* window.location.href = '/group/' + this.idGroup; */
    } else {
      this.createdGroupModal('Error', 'Error al actualizar el grupo');
    }
  }

  addUserToGroup(): void {
    const selectElement = document.querySelector('select');
    if(selectElement && !this.addUsers.includes(selectElement.value) && selectElement.selectedIndex !== 0) {
      this.addUsers.push(selectElement?.value || '');
      selectElement.selectedIndex = 0;
    };
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

  ngOnInit(): void {
    const groupId = this.route.snapshot.paramMap.get('id');
    this.idGroup = groupId || '';
  
    if (groupId) {
      this.groupService.getMappedGroupInfo(groupId).subscribe(group => {
        this.group = group;
      });
  
      this.groupService.getUsersFromGroup(groupId).subscribe(members => {
        this.members = members;
        this.usersInGroup = members.map(member => member.Username);
        this.loadFriends();
      });
    } else {
      this.loadFriends();
    }
  }
}