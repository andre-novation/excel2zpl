import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private messageService: MessageService) {}

  showSuccess(detail?: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: detail || undefined,
    });
  }

  showInfo(detail: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: detail,
    });
  }

  showWarn(detail: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: detail,
    });
  }

  showError(detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: detail,
    });
  }

  showContrast(detail: string) {
    this.messageService.add({
      severity: 'contrast',
      summary: 'Error',
      detail: detail,
    });
  }

  showSecondary(detail: string) {
    this.messageService.add({
      severity: 'secondary',
      summary: 'Secondary',
      detail: detail,
    });
  }

  clear = () => this.messageService.clear();
}
