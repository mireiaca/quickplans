import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GroupService } from '../group/group.service';

export interface Quickplan {
  Titulo: string;
  Descripcion: string;
  Fecha_Fin: string;
  Fecha_Incio: string;
  Imagen: string;
  field_asociados: string[];
  field_grupo_asociado: string;
  field_usuario_del_creador: string;
  field_tipo_de_actividad: string[];
  field_location: string;
  field_tipo_de_plan: string;
  field_latitud: string;
  field_longitud: string;
  nid: string;
  field_agregados: string[];
}

@Injectable({
  providedIn: 'root'
})
export class QuickplanService {

  private username = localStorage.getItem('username');

  private getQuickplansAsociado = `${environment.apiBaseUrl}/quickplans/user/${this.username}?_format=json`;
  private getQuickplansAgregado = `${environment.apiBaseUrl}/quickplans/add-user/${this.username}?_format=json`;
  private getQuickplansAgregadoOtherUser = `${environment.apiBaseUrl}/quickplans/add-user/`;
  private getQuickplansAnomimo = `${environment.apiBaseUrl}/quickplans/tipo-plan/Anonimo?_format=json`;
  private taxInterests = `${environment.apiBaseUrl}/tipos-de-actividad?_format=json`;
  private taxTypesPlans = `${environment.apiBaseUrl}/tipos-de-plan?_format=json`;
  private uniqueQuickplan = `${environment.apiBaseUrl}/node/`;

  constructor(
    private http: HttpClient,
    private groupService: GroupService
  ) { }

  // Obtener planes a los que está asociado el usuario
  getQuickplansAsociados(): Observable<Quickplan[]> {
    return this.http.get<Quickplan[]>(this.getQuickplansAsociado);
  }

  // Obtener planes a los que está agregados el usuario
  getQuickplansAgregados(): Observable<Quickplan[]> {
    return this.http.get<Quickplan[]>(this.getQuickplansAgregado);
  }

  // Obtener planes a los que está agregados otro usuario
  getQuickplansAgregadosOtherUser(user: string): Observable<Quickplan[]> {
    return this.http.get<Quickplan[]>(this.getQuickplansAgregadoOtherUser + `${user}?_format=json`);
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
  sendQuickplanTemplate(quickplan: Quickplan, usuarios: string[], imagenId: string): Observable<any> {
    /* console.log('sendQuickplanTemplate called with:', quickplan, usuarios, imagenId); */
    const interests: { uuid: string, nombre: string, tid: string }[] = [];

    return this.getAllInterests().pipe(
      map((interestsData: { uuid: string, nombre: string, tid: string }[]) => {
        /* console.log('Interests data received:', interestsData); */
        interests.push(...interestsData);
        
        const matchedTids: string[] = [];

        quickplan.field_tipo_de_actividad.forEach((tipo: string) => {
          const matchedInterest = interests.find((interest) => 
            interest.nombre.trim().toLowerCase() === tipo.trim().toLowerCase()  
          );
          if (matchedInterest) {
            matchedTids.push(matchedInterest.tid); 
          }
        });

        quickplan.field_tipo_de_actividad = matchedTids;
        /* console.log('Matched TIDs:', matchedTids); */
      }),
      switchMap(() => {
        const payload = {
          "type": [{"target_id": "quickplan"}],
          "title": [{"value": quickplan.Titulo}],
          "field_asociados": usuarios.map(usuario => ({ "value": usuario })),
          "field_agregados": [{"value": quickplan.field_usuario_del_creador}],
          "field_descripcion": [{"value": quickplan.Descripcion}],
          "field_fecha_inicio": [{"value": quickplan.Fecha_Incio}],
          "field_fecha_fin": [{"value": quickplan.Fecha_Fin}],
          ...(imagenId !== 'img-null' ? { "field_imagen": [{
            "target_type": "file",
            "target_uuid": imagenId
          }] } : {}),
          ...(quickplan.field_grupo_asociado ? { "field_grupo_asociado": [{"target_id": quickplan.field_grupo_asociado}] } : {}),
          "field_latitud": [{"value": quickplan.field_latitud}],
          "field_longitud": [{"value": quickplan.field_longitud}],
          ...(quickplan.field_tipo_de_actividad.length > 0 ? { "field_tipo_de_actividad": quickplan.field_tipo_de_actividad.map(tipo => ({ "target_id": tipo })) } : {}),
          "field_tipo_de_plan": [{"target_id": quickplan.field_tipo_de_plan}],
          "field_usuario_del_creador": [{"value": quickplan.field_usuario_del_creador}],
        };

        /* console.log('Payload constructed:', payload); */

        return this.http.post(`${environment.apiBaseUrl}/node?_format=json`, payload, {
          headers: { 
            'Content-Type': 'application/json',
            'X-CSRF-Token': localStorage.getItem('csrf_token') || '' 
          }
        });
      })
    );
  }

  // Editar un plan - Añadir y eliminar usuarios
  editQuickplan(id: string, type: string): Observable<any> {
    const currentUsername = localStorage.getItem('username') || '';

    return this.getQuickplan(id).pipe(
      switchMap((quickplanData: any) => {
        console.log('Quickplan data:', quickplanData);
        let usuariosAsociados: string[] = quickplanData.field_asociados.map((usuario: { value: string }) => usuario.value) || [];
        let usuariosAgregados: string[] = quickplanData.field_agregados.map((usuario: { value: string }) => usuario.value) || [];

        /* console.log('Usuarios asociados:', usuariosAsociados);
        console.log('Usuarios agregados:', usuariosAgregados); */

        if(type == 'aceptar') {
          usuariosAgregados.push(currentUsername);
          usuariosAsociados = usuariosAsociados.filter(usuario => typeof usuario === 'string' && !usuario.includes(currentUsername));
          
          if(quickplanData.field_grupo_asociado[0]?.target_id && quickplanData.field_tipo_de_plan[0].target_id == '1') {
            this.groupService.addUserToGroup(quickplanData.field_grupo_asociado[0].target_id, currentUsername).subscribe();
          }
          /* this.groupService.addUserToGroup(quickplanData.field_grupo_asociado, currentUsername).subscribe(); */
        } else if(type == 'rechazar') {
          usuariosAsociados = usuariosAsociados.filter(usuario => typeof usuario === 'string' && !usuario.includes(currentUsername));
        }

        /* console.log('Usuarios asociados:', usuariosAsociados);
        console.log('Usuarios agregados:', usuariosAgregados); */

        const payload = {
          "type":  "quickplan",
          "field_asociados": usuariosAsociados.map(usuario => ( usuario )),
          "field_agregados": usuariosAgregados.map(usuario => ( usuario )),
        };

        console.log('Payload:', payload); 

        return this.http.patch(`${environment.apiBaseUrl}/node/${id}?_format=json`, payload, {
          headers: { 
            'Content-Type': 'application/json',
            'X-CSRF-Token': localStorage.getItem('csrf_token') || '' 
          }
        });
      })
    );
  }

}