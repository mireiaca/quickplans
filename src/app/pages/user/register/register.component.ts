import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../../../components/info-modal/info-modal.component';

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
    private router: Router,
    private dialog: MatDialog
  ) {}

  errorAlRegistrarse(errorMessage: string): void {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      data: {
        title: 'Error',
        content: errorMessage
      }
    });
  }

  correctRegister(message: string): void {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      data: {
        title: 'Información',
        content: message
      }
    });
  }

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.errorAlRegistrarse(this.errorMessage);
      return;
    }

    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios';
      this.errorAlRegistrarse(this.errorMessage);
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (response) => {
        this.correctRegister('Registro exitoso, por favor inicia sesión.');
        //console.log('Registro exitoso:', response);
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        //console.error('Error en el registro:', err);
        this.errorMessage = 'Hubo un error al registrarse, por favor intenta de nuevo.';
      }
    });
  }
}
