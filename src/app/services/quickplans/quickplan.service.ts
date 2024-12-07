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
  field_location: string;
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
  private getQuickplansAgregado = `${environment.apiBaseUrl}/quickplans/add-user/${this.username}?_format=json`;
  private getQuickplansAnomimo = `${environment.apiBaseUrl}/quickplans/tipo-plan/Anonimo?_format=json`;
  private taxInterests = `${environment.apiBaseUrl}/tipos-de-actividad?_format=json`;
  private taxTypesPlans = `${environment.apiBaseUrl}/tipos-de-plan?_format=json`;
  private uniqueQuickplan = `${environment.apiBaseUrl}/node/`;

  constructor(private http: HttpClient) { }

  // Obtener planes a los que está asociado el usuario
  getQuickplansAsociados(): Observable<Quickplan[]> {
    return this.http.get<Quickplan[]>(this.getQuickplansAsociado);
  }

  // Obtener planes a los que está agregados el usuario
  getQuickplansAgregados(): Observable<Quickplan[]> {
    return this.http.get<Quickplan[]>(this.getQuickplansAgregado);
  }

  // Obtener planes a los que anónimos
  getQuickplansAnomimos(): Observable<Quickplan[]> {
    return this.http.get<Quickplan[]>(this.getQuickplansAnomimo);
  }

  // Obtener un plan en específico
  getQuickplan(id: string): Observable<Quickplan> {
    return this.http.get<Quickplan>(`${this.uniqueQuickplan}${id}?_format=json`);
  }

  // Obtener todos los intereses
  getAllInterests(): Observable<{ uuid: string, nombre: string, tid: string }[]> {
    return this.http.get<{ uuid: string, nombre: string, tid: string }[]>(this.taxInterests);
  }

  // Obtener todos los tipos de planes
  getAllTypesPlans(): Observable<{ uuid: string, nombre: string, tid: string }[]> {
    return this.http.get<{ uuid: string, nombre: string, tid: string }[]>(this.taxTypesPlans);
  }

  // Crear un plan
  createQuickplan(quickplan: Quickplan, type: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/node/quickplans?_format=json`, quickplan);
  }

  // Editar un plan
  editQuickplan(quickplan: Quickplan, id: string): Observable<any> {
    return this.http.patch(`${environment.apiBaseUrl}/node/quickplans/${id}?_format=json`, quickplan);
  }

}