import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../../../components/info-modal/info-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  errorLogin(errorMessage: string): void {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      data: {
        title: 'Error',
        content: errorMessage
      }
    });
  }

  onLogin(): void {
    // Limpiar el mensaje de error antes de hacer una nueva solicitud
    this.errorMessage = '';

    if(!this.username || !this.password) {
      this.errorMessage = 'Por favor, rellena los campos de usuario y contraseña.';
      this.errorLogin(this.errorMessage);
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Guardar el token en el localStorage
        localStorage.setItem('username', response.current_user.name);
        localStorage.setItem('csrf_token', response.csrf_token);
        localStorage.setItem('tokenlogout', response.logout_token);
        //console.log('Login exitoso:', response);

        // Redirigir al perfil
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        //console.error('Error en el login:', err);
        this.errorMessage = 'Usuario o contraseña incorrectos.';
        this.errorLogin(this.errorMessage);
      }
    });
  }
}
