import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    // Limpiar el mensaje de error antes de hacer una nueva solicitud
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Guardar el token en el localStorage
        localStorage.setItem('username', response.current_user.name);
        localStorage.setItem('csrf_token', response.csrf_token);
        localStorage.setItem('tokenlogout', response.logout_token);
        console.log('Login exitoso:', response);

        // Redirigir al perfil
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('Error en el login:', err);
        this.errorMessage = 'Usuario o contraseña incorrectos.';
      }
    });
  }
}
