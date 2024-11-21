import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  Nombre: string;
  Imagen: string;
  Biografia: string;
  Intereses: string;
  Localidad: string;
  Email: string;
  uuid: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<User[]> {
    const username = localStorage.getItem('username');
    const url = `${environment.apiBaseUrl}/get-user/${username}?_format=json`;
    return this.http.get<User[]>(url);
  }
}