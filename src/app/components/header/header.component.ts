import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications/notifications.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  notifications: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}
  ngOnInit(): void {
    this.notificationsService.getNotifications().subscribe({ 
      next: (response) => {
        this.notifications = response;
        console.log('Notificaciones:', this.notifications);
      },
      error: (err) => {
        console.error('Error al obtener las notificaciones:', err);
      }
    });
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout exitoso:', response);

        this.router.navigate(['/index']);
      },
      error: (err) => {
        console.error('Error en el logout:', err);
      }
    });
  }

  get csrfToken(): string | null {
    return localStorage.getItem('csrf_token');
  }
}
