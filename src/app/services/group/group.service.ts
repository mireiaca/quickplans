import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../user/user.service';


export interface Group {
  Titulo: string;
  Imagen: string | null;
  field_miembros: string | null;
  nid: string;
}

@Injectable({
  providedIn: 'root'
})

export class GroupService {

  constructor(private http: HttpClient) { }

  // Método para obtener los grupos de usuario
  getUserGroups(): Observable<Group[]> {
    const username = localStorage.getItem('username');
    const url = `${environment.apiBaseUrl}/es/grupos/user/${username}?_format=json`;
    return this.http.get<Group[]>(url);
  }

  // Metodo para obtener info de un grupo concreto
  getGroupInfo(groupId: string): Observable<Group> {
    const url = `${environment.apiBaseUrl}/node/${groupId}?_format=json`;
    return this.http.get<Group>(url);
  }

  // Método para mapear la respuesta del servicio a la interfaz Group
  private mapGroupResponse(response: any): Group {
    return {
      Titulo: response.title?.[0]?.value || '',
      Imagen: response.field_imagen?.[0]?.url || '',
      field_miembros: response.field_miembros?.map((miembro: any) => miembro.value) || [],
      nid: response.nid?.[0]?.value?.toString() || ''
    };
  }

  // Método para obtener info de un grupo concreto y mapear la respuesta
  getMappedGroupInfo(groupId: string): Observable<Group> {
    return this.getGroupInfo(groupId).pipe(
      map(response => this.mapGroupResponse(response))
    );
  }

  // Mapear los usuarios
  private mapUserResponse(response: any): User {
    return {
      uuid: response.uid,
      field_nombre: response.field_nombre || '',
      Nombre: response.name,
      Imagen: response.image,
      Biografia: response.biografia || '',
      Intereses: response.intereses || '',
      Localidad: response.localidad || '',
      Email: response.email || '',
      Username: response.username || '',
      Amigos: response.amigos || [],
      id: response.id || ''
    };
  }

  // Obtener los usuarios de un grupo
  getUsersFromGroup(groupId: string): Observable<User[]> {
    const url = `${environment.apiBaseUrl}/api/group-users/${groupId}`;
    return this.http.get<any[]>(url).pipe(
      map(response => response.map(user => this.mapUserResponse(user)))
    );
  }

  // Método para obtener información del grupo y luego actualizar los miembros
  addUserToGroup(groupId: string, username: string): Observable<any> {
    return this.getGroupInfo(groupId).pipe(
      map(group => {
        const updatedGroup = {
          type: 'group',
          field_miembros: Array.isArray(group.field_miembros)
            ? [...group.field_miembros, { value: username }]
            : [{ value: username }]
        };
  
        const url = `${environment.apiBaseUrl}/node/${groupId}?_format=json`;
  
        return this.http.patch(url, updatedGroup, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': localStorage.getItem('csrf_token') || ''
          }
        });
      }),
      switchMap(response => response) 
    );
  }
  
  // Método para obtener información del grupo y luego eliminar un miembro
  deleteUserFromGroup(groupId: string, username: string): Observable<any> {
    return this.getGroupInfo(groupId).pipe(
      map(group => {
        const updatedGroup = {
          type: 'group',
          field_miembros: Array.isArray(group.field_miembros)
            ? group.field_miembros.filter((miembro: any) => miembro.value !== username)
            : []
        };
  
        const url = `${environment.apiBaseUrl}/node/${groupId}?_format=json`;
  
        return this.http.patch(url, updatedGroup, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': localStorage.getItem('csrf_token') || ''
          }
        });
      }),
      switchMap(response => response), 
      catchError(error => {
        console.error('Error al eliminar usuario del grupo:', error);
        return throwError(error); 
      })
    );
  }
  
  // método para crear un grupo
  createGroupWithUsers(nombre: string, usuarios: string[]): Observable<any> {
    const url = `${environment.apiBaseUrl}/jsonapi/node/group`;
    const groupData = {
      data: {
      type: 'node--group',
      attributes: {
        title: nombre,
        field_miembros: usuarios.map(usuario => ({ value: usuario })),
       }, 
      relationships: {
        field_imagen: {
          data: {
            type: "file--file",
            id: "ea875399-e778-417d-8adc-a7b81485167f"
          }
        }
      }
    }
    };

    return this.http.post(url, groupData, {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'X-CSRF-Token': localStorage.getItem('csrf_token') || ''
      }
    });
  }

  // Método para editar un grupo
  editGroup(idGroup: string, nombre: string, usuarios: string[], imagenId: string): Observable<any> {
    if(imagenId != 'img-null') {
    const url = `${environment.apiBaseUrl}/node/${idGroup}?_format=json`;
    
    const groupData = {
      type: 'group',
      title: {
      value: nombre
      },
      field_miembros: usuarios.map(usuario => ({ value: usuario })),
      field_imagen: [
        {
            target_type: "file",
            target_uuid: imagenId
        }
    ]
    };

    return this.http.patch(url, groupData, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': localStorage.getItem('csrf_token') || ''
      }
    }); 
    } else {
      const url = `${environment.apiBaseUrl}/node/${idGroup}?_format=json`;
      const groupData = {
        type: 'group',
        title: {
          value: nombre
        },
        field_miembros: usuarios.map(usuario => ({ value: usuario }))
      };
  
      return this.http.patch(url, groupData, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': localStorage.getItem('csrf_token') || ''
        }
      });
    }
  }

  // Obtener todos los grupos
  getAllGroups(): Observable<Group[]> {
    const url = `${environment.apiBaseUrl}/es/grupos?_format=json`;
    return this.http.get<Group[]>(url);
  }

}