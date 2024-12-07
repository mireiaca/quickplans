import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../../../components/info-modal/info-modal.component';
import { LoadImagesService } from '../../../services/images/load-images.service';
import { ActivatedRoute } from '@angular/router';
import { User, UserService } from '../../../services/user/user.service';
import { Group, GroupService } from '../../../services/group/group.service';
import { QuickplanService } from '../../../services/quickplans/quickplan.service';
import { MapDialogComponent } from '../../../components/map-dialog/map-dialog.component';

@Component({
  selector: 'app-add-quickplan',
  templateUrl: './add-quickplan.component.html',
  styleUrl: './add-quickplan.component.scss'
})
export class AddQuickplanComponent implements OnInit {
  idImagen: string = 'img-null';
  userFriends: User[] = [];
  userGroups: Group[] = [];
  interests: { uuid: string, nombre: string }[] = [];

  constructor(
    private dialog: MatDialog,
    private loadImagesService: LoadImagesService,
    private route: ActivatedRoute,
    private userService: UserService,
    private groupService: GroupService,
    private quickplanService: QuickplanService
  ) { }

  openMapDialog(): void {
    const dialogRef = this.dialog.open(MapDialogComponent, {
      data: {
        title: 'Introduzca ubicación',
        center: { lat: 41.652, lng: -4.728 }, // Valladolid
      },
      width: '600px', 
      height: '500px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Ubicación seleccionada:', result);
      }
    });
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
      }));
    });
  }

  loadGroups(): void {
    this.groupService.getUserGroups().subscribe(groups => {
      this.userGroups = groups;
    });
  }

  loadInterests(): void {
    this.quickplanService.getAllInterests().subscribe((interests: { uuid: string, nombre: string }[]) => {
      this.interests = interests;
    });
  }

  ngOnInit(): void {
    const type = this.route.snapshot.paramMap.get('type');

    if (type == 'anonimo') {
      this.loadInterests();
    } else if (type == 'amistoso') {
      this.loadFriends();
    } else if (type == 'grupal') {
      this.loadGroups();
    }
  }

  getType(): string {
    return this.route.snapshot.paramMap.get('type') || '';
  }

  createdPlanModal(title: string, message: string): void {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      data: {
        title: title,
        content: message
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      if(message === 'Plan creado correctamente') {
        window.location.href = `/mis-planes`;
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
          this.createdPlanModal('Información', 'Imagen subida correctamente');
        } else {
          this.idImagen = 'img-null';
          this.createdPlanModal('Error', 'Error al subir la imagen');
        }
      };
    }
  }
}
