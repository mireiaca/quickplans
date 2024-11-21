import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginEndpoint = `${environment.apiBaseUrl}/user/login?_format=json`;
  private registerEndpoint = `${environment.apiBaseUrl}/user/register?_format=hal_json`;
  private recoverPasswordEndpoint = `${environment.apiBaseUrl}/user/password?_format=json`; 

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(username: string, password: string): Observable<any> {
    const body = {
      name: username,
      pass: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.loginEndpoint, body, { headers });
  }

  // Método para registrar un nuevo usuario
  register(username: string, email: string, password: string): Observable<any> {
    const body = {
      "_links": {
        "type": {
          "href": "http://quickplans-drupal-docker.ddev.site/rest/type/user/user"
        }
      },
      "name": [
        { "value": username }
      ],
      "mail": [
        { "value": email }
      ],
      "pass": [
        { "value": password }
      ]
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/hal+json'
    });

    return this.http.post(this.registerEndpoint, body, { headers });
  }

  // Método para recuperar la contraseña
  recoverPassword(email: string): Observable<any> {
    const body = {
      name: email 
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.recoverPasswordEndpoint, body, { headers });
  }

  // Método para cerrar sesión
  logout(): Observable<any> {
    const token = localStorage.getItem('tokenlogout');
    const logoutEndpoint = `${environment.apiBaseUrl}/user/logout?_format=json&token=${token}`;

    // Elimina los tokens en el localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('csrf_token');
    localStorage.removeItem('tokenlogout');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(logoutEndpoint, {}, { headers });
  }
}
