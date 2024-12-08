import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Notification {
  nid: string;
  field_channel: string;
  field_read: boolean;
  field_message: string;
  field_related: string;
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
      "field_channel": [{"value": notificación.field_channel}],
      "field_read": [{"value": notificación.field_read}],
      "field_message": [{"value": notificación.field_message}],
      "field_related": [{"value": notificación.field_related}],
      "field_creator_user": [{"value": notificación.field_creator_user}],
    };

    return this.http.post(`${environment.apiBaseUrl}/node?_format=json`, payload, {
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': localStorage.getItem('csrf_token') || '' 
      }
    });
  }
}
