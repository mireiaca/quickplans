import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

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
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static getMyFriends(): User[] {
    return this.getMyFriends();
  }

  constructor(private http: HttpClient) { }

  getUser(): Observable<User[]> {
    const username = localStorage.getItem('username');
    const url = `${environment.apiBaseUrl}/get-user/${username}?_format=json`;
    return this.http.get<User[]>(url);
  }

  getUserByUsername(username: string): Observable<User[]> {
    const url = `${environment.apiBaseUrl}/get-user/${username}?_format=json`;
    return this.http.get<User[]>(url);
  }

  getMyFriends(): Observable<User[]> {
    const username = localStorage.getItem('username');
    const url = `${environment.apiBaseUrl}/api/friends-user/${username}`;
    return this.http.get<User[]>(url);
  }

}