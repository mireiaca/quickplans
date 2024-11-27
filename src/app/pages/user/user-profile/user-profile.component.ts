import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../../services/user/user.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user = {
    Imagen: '',
    Nombre: '',
    Biografia: '',
    Localidad: '',
    Intereses: '',
    Username: ''
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if(username) {
      this.userService.getUserByUsername(username).subscribe((users: User[]) => {
        if (users.length > 0) {
          const userData = users[0];
          this.user = {
            Imagen: `${environment.apiBaseUrl}` + userData.Imagen,
            Nombre: userData.field_nombre,
            Username: userData.Nombre,
            Biografia: userData.Biografia,
            Localidad: userData.Localidad,
            Intereses: userData.Intereses
          };
        }
      });
    }
  }
}
