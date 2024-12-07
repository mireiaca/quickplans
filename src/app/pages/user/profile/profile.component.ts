import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService, User } from '../../../services/user/user.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user = {
    Imagen: '',
    Nombre: '',
    Username: '',
    Biografia: '',
    Localidad: '',
    Intereses: ''
  };

  constructor(private userService: UserService) {}

  editUserProfile(): void {
    window.location.href = `/edit-profile`;
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((users: User[]) => {
      if (users.length > 0) {
        const userData = users[0];
        this.user = {
          Imagen: `${environment.apiBaseUrl}` + userData.Imagen,
          Nombre: userData.Nombre,
          Username: userData.field_nombre,
          Biografia: userData.Biografia,
          Localidad: userData.Localidad,
          Intereses: userData.Intereses
        };
      }
    });
  }
}
