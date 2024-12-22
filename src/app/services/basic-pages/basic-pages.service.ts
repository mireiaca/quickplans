import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface BasicPage {
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class BasicPagesService {

  constructor( private http: HttpClient) { }

  getBasicPageInfo(pageId: string): Observable<BasicPage> {
    const url = `${environment.apiBaseUrl}/node/${pageId}?_format=json`;
    return this.http.get<any>(url).pipe(
      map(response => ({
        title: response.title[0].value,
        content: response.body[0].value
      }))
    );
  }
}
