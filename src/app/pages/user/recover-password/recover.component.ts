import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent {
  username: string = ''; 
  errorMessage: string = ''; 
  successMessage: string = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  // Recuperar contraseña
  onRecoverPassword(): void {
    if (!this.username) {
      this.errorMessage = 'Por favor, ingresa un nombre de usuario válido';
      return;
    }

    this.authService.recoverPassword(this.username).subscribe({
      next: (response) => {
        this.successMessage = 'Si el nombre de usuario existe, te hemos enviado instrucciones para recuperar tu contraseña.';
        this.errorMessage = ''; 
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Hubo un problema al intentar recuperar la contraseña. Intenta nuevamente más tarde.';
        this.successMessage = ''; 
      }
    });
  }
}
