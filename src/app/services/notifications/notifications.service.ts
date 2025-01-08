import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Notification {
  nid: string;
  title: string;
  field_channel: string;
  field_read: boolean;
  field_message: string;
  field_related: string[];
  field_creator_user: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private http: HttpClient
  ) { }

  // Crear notificación 
  createNotification(notificación: Notification): Observable<any> {
    const payload = {
      data: {
        type: "node--notification",
        attributes: {
          title: notificación.title,
          field_channel: { value: notificación.field_channel },
          field_read: { value: 0 },
          field_message: { value: notificación.field_message },
          field_related: notificación.field_related.map(related => ({ value: related })),
          field_creator_user: { value: notificación.field_creator_user }
        }
      }
    };    

    return this.http.post(`${environment.apiBaseUrl}/jsonapi/node/notification`, payload, {
      headers: { 
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'X-CSRF-Token': localStorage.getItem('csrf_token') || '' 
      }
    });
  }

  // Leer notificaciones
  getNotifications(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/notifications/${localStorage.getItem('username')}?_format=json`, {
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': localStorage.getItem('csrf_token') || '' 
      }
    });
  }

  // Marcar notificación como leída
  markAsRead(nid: string): Observable<any> {
    const payload = {
      "field_read": [{"value": true}]
    };

    return this.http.patch(`${environment.apiBaseUrl}/node/${nid}?_format=json`, payload, {
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': localStorage.getItem('csrf_token') || '' 
      }
    });
  }

  // Ver notificación por id
  getNotificationById(nid: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/node/${nid}?_format=json`, {
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': localStorage.getItem('csrf_token') || '' 
      }
    });
  }
}
