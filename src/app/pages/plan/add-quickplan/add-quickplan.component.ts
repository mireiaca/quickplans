import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../../../components/info-modal/info-modal.component';
import { LoadImagesService } from '../../../services/images/load-images.service';
import { ActivatedRoute } from '@angular/router';
import { User, UserService } from '../../../services/user/user.service';
import { Group, GroupService } from '../../../services/group/group.service';
import { QuickplanService, Quickplan } from '../../../services/quickplans/quickplan.service';
import { MapDialogComponent } from '../../../components/map-dialog/map-dialog.component';
import { map } from 'rxjs';
import { GoogleCalendarService } from '../../../services/google-api-calendar/google-calendar.service';

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
  latitud: string = '';
  longitud: string = '';
  tiposActividad: string[] = [];
  grupoId: string = '';
  typePlan: number = 0;

  constructor(
    private dialog: MatDialog,
    private loadImagesService: LoadImagesService,
    private route: ActivatedRoute,
    private userService: UserService,
    private groupService: GroupService,
    private quickplanService: QuickplanService,
    private googleCalendarService: GoogleCalendarService
  ) { }

  /* async addEvent() {
    const event = {
      summary: 'Reunión de prueba',
      start: { dateTime: '2024-12-10T10:00:00-07:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2024-12-10T11:00:00-07:00', timeZone: 'America/Los_Angeles' },
    };

    try {
      const createdEvent = await this.googleCalendarService.createEvent(event);
      console.log('Evento creado:', createdEvent);
    } catch (error) {
      console.error('Error al crear el evento:', error);
    }
  } */

  // Mapa - Dialog
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
        this.latitud = result.lat;
        this.longitud = result.lng;
      }
    });
  }
  
  // Cargar amigos
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

  // Cargar grupos
  loadGroups(): void {
    this.groupService.getUserGroups().subscribe(groups => {
      this.userGroups = groups;
    });
  }

  // Cargar intereses
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

  // Crear plan
  addQuickplan(): void {
    if((document.getElementById('name') as HTMLInputElement).value == '' 
        || (document.getElementById('what') as HTMLInputElement).value  == ''
        || (document.getElementById('when-since') as HTMLInputElement).value == '' 
        || (document.getElementById('when-until') as HTMLInputElement).value == ''
        || this.latitud == '' || this.longitud == '' ) {
       this.createdPlanModal('Error', 'Rellene todos los campos');
        return;
    }

    // Según el tipo de plan
    if(this.getType() == 'anonimo') {
      const interest1 = document.getElementById('interest1') as HTMLSelectElement | null;
      const interest2 = document.getElementById('interest2') as HTMLSelectElement | null;
      const interest3 = document.getElementById('interest3') as HTMLSelectElement | null;
      const selectedInterest1 = interest1?.options[interest1.selectedIndex]?.text ?? '';
      const selectedInterest2 = interest2?.options[interest2.selectedIndex]?.text ?? '';
      const selectedInterest3 = interest3?.options[interest3.selectedIndex]?.text ?? '';

      this.tiposActividad = [selectedInterest1, selectedInterest2, selectedInterest3];
     
      this.groupService.createGroupWithUsers(
        (document.getElementById('name') as HTMLInputElement)?.value || '', 
        [localStorage.getItem('username') || ''],
      ).pipe(  
        map((response: any) => {
          this.grupoId = response.data.attributes.drupal_internal__nid;
          return this.grupoId;
        })
      ).subscribe((groupId: string) => {
        this.grupoId = groupId;
        this.typePlan = 1;
        const usuarios: string[] = [];

        const quickplan: Quickplan = {
          Titulo: (document.getElementById('name') as HTMLInputElement).value,
          Descripcion: (document.getElementById('what') as HTMLInputElement).value,
          Fecha_Fin: (document.getElementById('when-since') as HTMLInputElement).value + ":00Z",
          Fecha_Incio: (document.getElementById('when-until') as HTMLInputElement).value+ ":00Z",
          Imagen: '',
          field_asociados: [],
          field_grupo_asociado: this.grupoId,
          field_usuario_del_creador: localStorage.getItem('username') || '',
          field_location: '',
          field_tipo_de_actividad: this.tiposActividad,
          field_tipo_de_plan: `${this.typePlan}`,
          field_latitud: this.latitud,
          field_longitud: this.longitud,
          nid: '',
          field_agregados: usuarios
        };

        console.log(quickplan);

        this.quickplanService.sendQuickplanTemplate(quickplan, usuarios, this.idImagen).subscribe(
          () => {
            this.createdPlanModal('Información', 'Plan creado correctamente');
          },
          (error) => {
            console.error('Error creating plan:', error);
            this.createdPlanModal('Error', 'Error al crear el plan');
          }
        );
      });

    } else if(this.getType() == 'amistoso') {
      if((document.getElementById('who') as HTMLSelectElement).selectedIndex == 0) {
        this.createdPlanModal('Error', 'Seleccione un amigo');
        return;
      }

      const friend = document.getElementById('who') as HTMLSelectElement | null;
      const selectedFriend = friend?.options[friend.selectedIndex]?.text ?? '';

      const usuariosAgregados: string[] = [localStorage.getItem('username') || ''];

      const usuariosAsociados: string[] = [selectedFriend];

      this.typePlan = 3;

      const quickplan: Quickplan = {
        Titulo: (document.getElementById('name') as HTMLInputElement).value,
        Descripcion: (document.getElementById('what') as HTMLInputElement).value,
        Fecha_Fin: (document.getElementById('when-since') as HTMLInputElement).value + ":00Z",
        Fecha_Incio: (document.getElementById('when-until') as HTMLInputElement).value+ ":00Z",
        Imagen: '',
        field_asociados:[],
        field_grupo_asociado: '',
        field_usuario_del_creador: localStorage.getItem('username') || '',
        field_location: '',
        field_tipo_de_actividad: [],
        field_tipo_de_plan: `${this.typePlan}`,
        field_latitud: this.latitud,
        field_longitud: this.longitud,
        nid: '',
        field_agregados: usuariosAgregados
      };

      console.log(quickplan);

      this.quickplanService.sendQuickplanTemplate(quickplan, usuariosAsociados, this.idImagen).subscribe(
        () => {
          this.createdPlanModal('Información', 'Plan creado correctamente');
        },
        (error) => {
          console.error('Error creating plan:', error);
          this.createdPlanModal('Error', 'Error al crear el plan');
        }
      );

    } else if(this.getType() == 'grupal') {
      const group = document.getElementById('who') as HTMLSelectElement | null;
      const groupID = group?.options[group.selectedIndex]?.value ?? '';
      let miembros: any = [];
      /* console.log(groupID); */
     
      this.groupService.getGroupInfo(groupID).pipe(  
        map((response: any) => {
          miembros = response.field_miembros || '';
        })
      ).subscribe(() => {
        this.grupoId = groupID;
        this.typePlan = 2;
        const usuariosAsociados: string[] = miembros.map((miembro: any) => miembro.value);

        const quickplan: Quickplan = {
          Titulo: (document.getElementById('name') as HTMLInputElement).value,
          Descripcion: (document.getElementById('what') as HTMLInputElement).value,
          Fecha_Fin: (document.getElementById('when-since') as HTMLInputElement).value + ":00Z",
          Fecha_Incio: (document.getElementById('when-until') as HTMLInputElement).value+ ":00Z",
          Imagen: '',
          field_asociados: [],
          field_grupo_asociado: this.grupoId,
          field_usuario_del_creador: localStorage.getItem('username') || '',
          field_location: '',
          field_tipo_de_actividad: this.tiposActividad,
          field_tipo_de_plan: `${this.typePlan}`,
          field_latitud: this.latitud,
          field_longitud: this.longitud,
          nid: '',
          field_agregados: usuariosAsociados
        };

        console.log(quickplan);

        this.quickplanService.sendQuickplanTemplate(quickplan, usuariosAsociados, this.idImagen).subscribe(
          () => {
            this.createdPlanModal('Información', 'Plan creado correctamente');
          },
          (error) => {
            console.error('Error creating plan:', error);
            this.createdPlanModal('Error', 'Error al crear el plan');
          }
        );
      });
    }

  }

  // Plan creado - Modal
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

  // Cargar imagen
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
