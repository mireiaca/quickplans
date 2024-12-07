import { Component } from '@angular/core';
import { User, UserService } from '../../../services/user/user.service';
import { LoadImagesService } from '../../../services/images/load-images.service';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../../../components/info-modal/info-modal.component';
import { QuickplanService } from '../../../services/quickplans/quickplan.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  idImagen: string = 'img-null';
  interests: { uuid: string, nombre: string }[] = [];
  user: User = {
    Imagen: '',
    Nombre: '',
    Username: '',
    Biografia: '',
    Localidad: '',
    Intereses: '',
    id: '',
    field_nombre: '',
    Email: '',
    Amigos: [],
    uuid: ''
  };

  // Guardar usuario
  saveUser(): void {
    const username = localStorage.getItem('username');
    document.getElementById('edit-create-group')?.setAttribute('inert', 'true');
    
    if (username) {
      this.userService.getUserByUsername(username).subscribe((users: User[]) => {
        if (users.length > 0) {
          const iduser = (users[0] as any).uid;
  
          const user_name = document.getElementById('name') as HTMLInputElement | null;
          const interest1 = document.getElementById('interest1') as HTMLSelectElement | null;
          const interest2 = document.getElementById('interest2') as HTMLSelectElement | null;
          const interest3 = document.getElementById('interest3') as HTMLSelectElement | null;
            const selectedInterest1 = interest1?.options[interest1.selectedIndex]?.text ?? '';
            const selectedInterest2 = interest2?.options[interest2.selectedIndex]?.text ?? '';
            const selectedInterest3 = interest3?.options[interest3.selectedIndex]?.text ?? '';
          const localidad = document.getElementById('localidad') as HTMLInputElement | null;
          const biografia = document.getElementById('biografia') as HTMLTextAreaElement | null;
  
          if (!user_name || !interest1 || !interest2 || !interest3 || !localidad || !biografia) {
            console.error('Uno o más elementos no se encontraron en el DOM');
            return;
          }
          
          const interests = [selectedInterest1, selectedInterest2, selectedInterest3];
          const idImagen = this.idImagen;
  
          this.userService.editProfile(
            iduser,
            user_name.value,
            interests,
            localidad.value,
            biografia.value,
            idImagen
          ).subscribe(
            () => this.createdGroupModal('Información', 'Perfil actualizado correctamente'),
            (error) => {
              console.error('Error al actualizar el perfil:', error);
              this.createdGroupModal('Error', 'No se pudo actualizar el perfil');
            }
          );
        } else {
          console.error('Usuario no encontrado');
        }
      });
    } else {
      console.error('Username no encontrado en localStorage');
    }
  }
  
  // Cancelar
  cancel(): void {
    window.location.href = '/profile';
  }

  // Modal
  createdGroupModal(title: string, message: string): void {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      data: {
        title: title,
        content: message
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      if(message === 'Perfil actualizado correctamente') {
        window.location.href = `/profile`;
      }
    });
  }

  // Obtener mis intereses
  getMyInterests(): string[] {
    return this.user.Intereses.split(',');
  }

  // Subir imagen
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

  constructor(
    private userService: UserService, 
    private dialog: MatDialog,
    private loadImagesService: LoadImagesService,
    private quickplanService: QuickplanService
  ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe((users: User[]) => {
      if (users.length > 0) {
        const userData = users[0];
        this.user = {
          Imagen: `${environment.apiBaseUrl}` + userData.Imagen,
          Nombre: userData.Nombre,
          Username: userData.field_nombre,
          Biografia: userData.Biografia,
          Localidad: userData.Localidad,
          Intereses: userData.Intereses,
          id: userData.id,
          field_nombre: userData.field_nombre,
          Email: userData.Email,
          Amigos: userData.Amigos,
          uuid: userData.uuid
        };
      }
    });

    this.quickplanService.getAllInterests().subscribe((interests: { uuid: string, nombre: string }[]) => {
      this.interests = interests;
    });
  }
}
