import { Component } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent {
  isModalVisible: boolean = false;
  errorMessage: string = '';

  // Mostrar el modal con un mensaje de error
  showError(message: string): void {
    this.errorMessage = message;
    this.isModalVisible = true;
  }

  // Cerrar el modal
  closeModal(): void {
    this.isModalVisible = false;
  }
}
