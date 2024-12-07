import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

export interface Image {
  file_id: string;
  file_uuid: string;
  file_url: string;
}

@Injectable({
  providedIn: 'root'
})

export class LoadImagesService {

  constructor(private http: HttpClient) {}

  // Método para subir una imagen
  uploadImage(image: File): Promise<Image> {
    const formData = new FormData();
    formData.append('file', image);
    const uploadUrl = `${environment.apiBaseUrl}/api/upload-image`;
    return this.http.post<Image>(uploadUrl, formData).toPromise().then(response => {
      if (response && response.file_id && response.file_uuid && response.file_url) {
        return response;
      }
      throw new Error('File upload failed');
    });
  }
}
