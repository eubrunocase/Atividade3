import { Component, inject } from '@angular/core';
import { ToastService, ToastType } from '../../services/toast';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  protected readonly toastService = inject(ToastService);

  protected iconFor(type: ToastType): string {
    if (type === 'success') {
      return '✓';
    }

    if (type === 'error') {
      return '!';
    }

    return 'i';
  }
}
