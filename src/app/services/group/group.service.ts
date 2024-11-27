import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../user/user.service';


export interface Group {
  Titulo: string | null;
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
      Amigos: response.amigos || []
    };
  }

  getUsersFromGroup(groupId: string): Observable<User[]> {
    const url = `${environment.apiBaseUrl}/api/group-users/${groupId}`;
    return this.http.get<any[]>(url).pipe(
      map(response => response.map(user => this.mapUserResponse(user)))
    );
  }

}