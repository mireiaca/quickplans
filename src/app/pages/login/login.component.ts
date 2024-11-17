import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // Mensaje de error

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    // Limpiar el mensaje de error antes de hacer una nueva solicitud
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Guardar la sesión o token en el localStorage o sessionStorage
        localStorage.setItem('token', response.token);
        console.log('Login exitoso:', response);

        // Redirigir al perfil
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('Error en el login:', err);
        this.errorMessage = 'Usuario o contraseña incorrectos.'; // Mostrar error en el login
      }
    });
  }
}
