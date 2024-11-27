import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Quickplan {
  Titulo: string;
  Descripcion: string;
  Fecha_Fin: string;
  Fecha_Incio: string;
  Imagen: string;
  field_asociados: string;
  field_grupo_asociado: string;
  field_usuario_del_creador: string;
  field_tipo_de_actividad: string;
  field_tipo_de_plan: string;
  nid: string;
  field_agregados: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuickplanService {

  private username = localStorage.getItem('username');

  private getQuickplansAsociado = `${environment.apiBaseUrl}/quickplans/user/${this.username}?_format=json`;
  private getQuickplansAnomimo = `${environment.apiBaseUrl}/quickplans/tipo-plan/Anonimo?_format=json`;

  constructor(private http: HttpClient) { }

  getQuickplansAsociados(): Observable<Quickplan[]> {
    return this.http.get<Quickplan[]>(this.getQuickplansAsociado);
  }

  getQuickplansAnomimos(): Observable<Quickplan[]> {
    return this.http.get<Quickplan[]>(this.getQuickplansAnomimo);
  }
}