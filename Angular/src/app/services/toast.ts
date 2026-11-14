import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly messagesState = signal<ToastMessage[]>([]);
  private readonly timers = new Map<number, ReturnType<typeof setTimeout>>();
  private nextId = 1;

  readonly messages = this.messagesState.asReadonly();

  success(message: string): void {
    this.show('success', message);
  }

  error(message: string): void {
    this.show('error', message);
  }

  info(message: string): void {
    this.show('info', message);
  }

  dismiss(id: number): void {
    const timer = this.timers.get(id);

    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }

    this.messagesState.update((messages) => messages.filter((message) => message.id !== id));
  }

  private show(type: ToastType, message: string): void {
    const id = this.nextId++;

    this.messagesState.update((messages) => [...messages, { id, type, message }]);

    const timer = setTimeout(() => this.dismiss(id), 4500);
    this.timers.set(id, timer);
  }
}
