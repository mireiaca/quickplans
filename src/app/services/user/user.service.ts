import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../../components/info-modal/info-modal.component';
import { QuickplanService } from '../quickplans/quickplan.service';
import { NotificationsService, Notification } from '../notifications/notifications.service';

export interface User {
  field_nombre: string;
  Nombre: string;
  Username: string;
  Imagen: string;
  Biografia: string;
  Intereses: string;
  Localidad: string;
  Email: string;
  Amigos: Array<string> | null;
  uuid: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static getMyFriends(): User[] {
    return this.getMyFriends();
  }

  constructor(
    private http: HttpClient, 
    private dialog: MatDialog,
    private quickplanService: QuickplanService, 
    private notificationService: NotificationsService
  ) { }

  // editar perfil
  editProfile(
    idUser: string,
    nombre: string,
    intereses: string[],
    localidad: string,
    biografia: string,
    imagenId: string
  ): Observable<any> {
    const url = `${environment.apiBaseUrl}/user/${idUser}?_format=json`;

    console.log('Intereses introducidos:', intereses);

    return this.quickplanService.getAllInterests().pipe(
      map((interestsData: any) => {
        console.log('Intereses almacenados:', interestsData);

        const result = interestsData.filter((interest: any) => intereses.some(i => i.trim().toLowerCase() === interest.nombre.trim().toLowerCase()))
                                    .map((interest: any) => interest.tid);

        console.log('TIDs encontrados:', result);

        const profileData: any = {
          field_nombre: [{ value: nombre }],
          field_biografia: [{ value: biografia }],
          field_localidad: [{ value: localidad }],
          field_intereses: result.map((tid: string) => ({ target_id: tid }))
        };

        if (imagenId !== 'img-null') {
          profileData.user_picture = [
            {
              target_type: 'file',
              target_uuid: imagenId,
            },
          ];
        }

        return this.http.patch(url, profileData, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': localStorage.getItem('csrf_token') || '',
          },
        });
      }),
      switchMap((patchRequest: Observable<any>) => patchRequest)
    );
/* 
    const profileData: any = {
      field_nombre: [{ value: nombre }],
      field_biografia: [{ value: biografia }],
      field_localidad: [{ value: localidad }],
      field_intereses: result.map((tid: string) => ({ target_id: tid }))
    };

    if (imagenId !== 'img-null') {
      profileData.user_picture = [
        {
          target_type: 'file',
          target_uuid: imagenId,
        },
      ];
    }

    return this.http.patch(url, profileData, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': localStorage.getItem('csrf_token') || '',
      },
    }); */
  }

  // obtener perfil concreto
  getUser(): Observable<User[]> {
    const username = localStorage.getItem('username');
    const url = `${environment.apiBaseUrl}/get-user/${username}?_format=json`;
    return this.http.get<User[]>(url);
  }

  // modal
  messageDialog(title: string, content: string): void {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      data: {
        title: title,
        content: content
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(title === 'Información') {
        window.location.href = `/community`;
      }
    });
  }

  // obtener perfil por username
  getUserByUsername(username: string): Observable<User[]> {
    const url = `${environment.apiBaseUrl}/get-user/${username}?_format=json`;
    return this.http.get<User[]>(url);
  }

  // obtener mis amigos
  getMyFriends(): Observable<User[]> {
    const username = localStorage.getItem('username');
    const url = `${environment.apiBaseUrl}/api/friends-user/${username}`;
    return this.http.get<User[]>(url);
  }

  // obtener todos los usuarios
  getAllUsers(): Observable<User[]> {
    const url = `${environment.apiBaseUrl}/all-users?_format=json`;
    return this.http.get<User[]>(url);
  }

  // añadir amigo
  addFriend(friendUsername: string): void {
    const myUsername = localStorage.getItem('username');
    let correcto = false;
    let correcto2 = false;
  
    const myId = this.getUser();
    const hisId = this.getUserByUsername(friendUsername);

    myId.pipe(
      switchMap(id => {
        const urlMyFriends = `${environment.apiBaseUrl}/get-user/${myUsername}?_format=json`;
        return this.http.get<any[]>(urlMyFriends, {
          headers: { 
            'Content-Type': 'application/json',
            'X-CSRF-Token': localStorage.getItem('csrf_token') || '' 
          }
        });
      }),
      switchMap(user => {
        // Obtener la lista actual de amigos y dividirla por comas
        const currentFriends = user[0].field_amigos.split(',').map((friend: string) => ({ value: friend.trim() }));
        
        // Añadir el nuevo amigo a la lista
        const updatedFriends = [
          ...currentFriends,
          { value: friendUsername }
        ];
        
        // Preparar la URL para la llamada PATCH
        const myId = user[0].uid;
        const urlMyFriends = `${environment.apiBaseUrl}/user/${myId}?_format=json`;
        
        return this.http.patch(urlMyFriends, { field_amigos: updatedFriends }, {
          headers: { 
            'Content-Type': 'application/json',
            'X-CSRF-Token': localStorage.getItem('csrf_token') || '' 
          }
        });
      })
    ).subscribe(
      response => {
        console.log('Amigo añadido correctamente:', response);
        correcto = true;
      },
      error => {
        console.error('Error al añadir amigo:', error);
        correcto = false;
      }
    );
    
    hisId.pipe(
      switchMap(id => {
        const urlMyFriends = `${environment.apiBaseUrl}/get-user/${friendUsername}?_format=json`;
        return this.http.get<any[]>(urlMyFriends, {
          headers: { 
            'Content-Type': 'application/json',
            'X-CSRF-Token': localStorage.getItem('csrf_token') || '' 
          }
        });
      }),
      switchMap(user => {
        // Obtener la lista actual de amigos y dividirla por comas
        const currentFriends = user[0].field_amigos.split(',').map((friend: string) => ({ value: friend.trim() }));
        
        // Añadir el nuevo amigo a la lista
        const updatedFriends = [
          ...currentFriends,
          { value: myUsername }
        ];
        
        // Preparar la URL para la llamada PATCH
        const hisId = user[0].uid;
        console.log('hisId:', user[0].uid);
        const urlMyFriends = `${environment.apiBaseUrl}/user/${hisId}?_format=json`;
        
        return this.http.patch(urlMyFriends, { field_amigos: updatedFriends }, {
          headers: { 
            'Content-Type': 'application/json',
            'X-CSRF-Token': localStorage.getItem('csrf_token') || '' 
          }
        });
      })
    ).subscribe(
      response => {
        console.log('Amigo añadido correctamente:', response);
        correcto2 = true;
        
      },
      error => {
        console.error('Error al añadir amigo:', error);
        correcto2 = false;
      }
    );

    setTimeout(() => {
      if(correcto && correcto2) {
      this.messageDialog('Información', 'Amigo añadido correctamente');
      const notification: Notification = {
        title: 'Te han añadido como amigo',
        field_channel: 'Aviso',
        field_read: false,
        field_message: `El usuario ${myUsername} te ha añadido como amigo`,
        field_related: [friendUsername],
        field_creator_user: myUsername || '',
        nid: ''
      };
      console.log('Notificación:', notification);
      this.notificationService.createNotification(notification).subscribe(
        response => console.log('Notificación creada correctamente:', response),
        error => console.error('Error al crear la notificación:', error)
      );
      } else {
      this.messageDialog('Error', 'Error al añadir amigo');
      }
    }, 6000);
    
  }

  // eliminar amigo
  removeFriend(friendUsername: string): void {
    const myUsername = localStorage.getItem('username');
    let correcto = false;
    let correcto2 = false;

    const myId = this.getUser();
    const hisId = this.getUserByUsername(friendUsername);

    myId.pipe(
      switchMap(id => {
        const urlMyFriends = `${environment.apiBaseUrl}/get-user/${myUsername}?_format=json`;
        return this.http.get<any[]>(urlMyFriends, {
          headers: { 
            'Content-Type': 'application/json',
            'X-CSRF-Token': localStorage.getItem('csrf_token') || '' 
          }
        });
      }),
      switchMap(user => {
        // Obtener la lista actual de amigos y dividirla por comas
        const currentFriends = user[0].field_amigos.split(',').map((friend: string) => friend.trim());
        
        // Eliminar el amigo de la lista
        const updatedFriends = currentFriends.filter((friend: string) => friend !== friendUsername);
        
        // Preparar la URL para la llamada PATCH
        const myId = user[0].uid;
        const urlMyFriends = `${environment.apiBaseUrl}/user/${myId}?_format=json`;
        
        return this.http.patch(urlMyFriends, { field_amigos: updatedFriends }, {
          headers: { 
            'Content-Type': 'application/json',
            'X-CSRF-Token': localStorage.getItem('csrf_token') || '' 
          }
        });
      })
    ).subscribe(
      response => {
        console.log('Amigo eliminado correctamente:', response);
        correcto = true;
      },
      error => {
        console.error('Error al eliminar amigo:', error);
        correcto = false;
      }
    );

    hisId.pipe(
      switchMap(id => {
        const urlMyFriends = `${environment.apiBaseUrl}/get-user/${friendUsername}?_format=json`;
        return this.http.get<any[]>(urlMyFriends, {
          headers: { 
            'Content-Type': 'application/json',
            'X-CSRF-Token': localStorage.getItem('csrf_token') || '' 
          }
        });
      }),
      switchMap(user => {
        // Obtener la lista actual de amigos y dividirla por comas
        const currentFriends = user[0].field_amigos.split(',').map((friend: string) => friend.trim());
        
        // Eliminar el amigo de la lista
        const updatedFriends = currentFriends.filter((friend: string) => friend !== myUsername);
        
        // Preparar la URL para la llamada PATCH
        const hisId = user[0].uid;
        const urlMyFriends = `${environment.apiBaseUrl}/user/${hisId}?_format=json`;
        
        return this.http.patch(urlMyFriends, { field_amigos: updatedFriends }, {
          headers: { 
            'Content-Type': 'application/json',
            'X-CSRF-Token': localStorage.getItem('csrf_token') || '' 
          }
        });
      })
    ).subscribe(
      response => {
        console.log('Amigo eliminado correctamente:', response);
        correcto2 = true;
      },
      error => {
        console.error('Error al eliminar amigo:', error);
        this.messageDialog('Error', 'Error al eliminar amigo');
        correcto2 = false;
      }
    );

    setTimeout(() => {
      if(correcto && correcto2) {
      this.messageDialog('Información', 'Amigo eliminado correctamente');
      } else {
      this.messageDialog('Error', 'Error al eliminar amigo');
      }
    }, 4000);
  }

}