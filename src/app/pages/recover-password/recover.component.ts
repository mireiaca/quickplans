import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'; // Importa el servicio
import { Router } from '@angular/router'; // Para redirigir después de la recuperación

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent {
  username: string = ''; // Variable para almacenar el correo electrónico del usuario
  errorMessage: string = ''; // Variable para mostrar mensajes de error (opcional)
  successMessage: string = ''; // Mensaje de éxito, para mostrar si la recuperación fue exitosa

  constructor(private authService: AuthService, private router: Router) {}

  // Método para manejar la recuperación de contraseña
  onRecoverPassword(): void {
    if (!this.username) {
      this.errorMessage = 'Por favor, ingresa un nombre de usuario válido';
      return;
    }

    // Llamamos al servicio para recuperar la contraseña
    this.authService.recoverPassword(this.username).subscribe({
      next: (response) => {
        this.successMessage = 'Si el nombre de usuario existe, te hemos enviado instrucciones para recuperar tu contraseña.';
        this.errorMessage = ''; // Limpiar mensajes de error en caso de éxito
        // Redirigir al login si es necesario
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Hubo un problema al intentar recuperar la contraseña. Intenta nuevamente más tarde.';
        this.successMessage = ''; // Limpiar mensaje de éxito en caso de error
      }
    });
  }
}
