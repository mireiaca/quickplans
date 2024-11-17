import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
    // Los datos se deben enviar en el formato específico que espera el backend.
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

    // Los encabezados para la solicitud
    const headers = new HttpHeaders({
      'Content-Type': 'application/hal+json'
    });

    // Realizamos la solicitud POST al endpoint de registro
    return this.http.post(this.registerEndpoint, body, { headers });
  }

  // Método para recuperar la contraseña
  recoverPassword(email: string): Observable<any> {
    const body = {
      name: email // Se espera que 'name' sea el correo del usuario según el formato del endpoint
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.recoverPasswordEndpoint, body, { headers });
  }
}
