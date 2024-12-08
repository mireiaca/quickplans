import { Injectable } from '@angular/core';
import { loadGapiInsideDOM } from 'gapi-script';

@Injectable({
  providedIn: 'root', // Proporciona este servicio a toda la aplicación
})
export class GoogleCalendarService {
  private gapi: any;
  private CLIENT_ID = '799557942396-or87vucbmbse1jc1pjvsesc6hh7u0erk.apps.googleusercontent.com'; // Reemplázalo con tu Client ID
  private API_KEY = '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'; // Reemplázalo con tu API Key
  private SCOPES = 'https://www.googleapis.com/auth/calendar';

  constructor() {
    this.initializeGapi(); // Inicializa la API al crear el servicio
  }

  private initializeGapi() {
    loadGapiInsideDOM().then(() => {
      this.gapi = (window as any).gapi; // Accede a gapi desde el DOM
      this.gapi.load('client:auth2', () => {
        this.gapi.client.init({
          apiKey: this.API_KEY,
          clientId: this.CLIENT_ID,
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
          ],
          scope: this.SCOPES,
        });
      });
    });
  }

  async signIn() {
    try {
      const authInstance = this.gapi.auth2.getAuthInstance();
      await authInstance.signIn();
      return authInstance.isSignedIn.get();
    } catch (error) {
      console.error('Error signing in', error);
      throw error;
    }
  }

  async createEvent(event: any) {
    try {
      await this.signIn();
      const response = await this.gapi.client.calendar.events.insert({
        calendarId: 'primary', 
        resource: event,      
      });
      return response.result;
    } catch (error) {
      console.error('Error creating event', error);
      throw error;
    }
  }
}
