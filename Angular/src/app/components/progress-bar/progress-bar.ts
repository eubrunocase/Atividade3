import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css',
})
export class ProgressBar {
  readonly value = input.required<number>();
  readonly label = input('Progresso da reserva');

  protected readonly clampedValue = computed(() =>
    Math.min(100, Math.max(0, Math.round(this.value()))),
  );
}
