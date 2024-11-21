import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

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
