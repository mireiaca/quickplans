import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/login']); // Redirigir a login después del registro exitoso
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        this.errorMessage = 'Hubo un error al registrarse, por favor intenta de nuevo.';
      }
    });
  }
}
