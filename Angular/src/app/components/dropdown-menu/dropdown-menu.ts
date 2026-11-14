import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

export interface DropdownOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.html',
  styleUrl: './dropdown-menu.css',
})
export class DropdownMenu {
  readonly label = input('Selecionar opção');
  readonly options = input.required<DropdownOption[]>();
  readonly optionSelected = output<DropdownOption>();
  protected readonly isOpen = signal(false);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  protected toggle(): void {
    this.isOpen.update((open) => !open);
  }

  protected selectOption(option: DropdownOption): void {
    this.isOpen.set(false);
    this.optionSelected.emit(option);
  }

  @HostListener('document:click', ['$event'])
  protected closeOnOutsideClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isOpen.set(false);
    }
  }
}
