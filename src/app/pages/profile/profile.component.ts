import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user = {
    Imagen: '',
    Nombre: '',
    Biografia: '',
    Localidad: '',
    Intereses: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((users: User[]) => {
      if (users.length > 0) {
        const userData = users[0];
        this.user = {
          Imagen: `${environment.apiBaseUrl}` + userData.Imagen,
          Nombre: userData.Nombre,
          Biografia: userData.Biografia,
          Localidad: userData.Localidad,
          Intereses: userData.Intereses
        };
      }
    });
  }
}
