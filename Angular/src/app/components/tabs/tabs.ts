import { Component, computed, input, signal } from '@angular/core';

export interface TabItem {
  label: string;
  content: string[];
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class Tabs {
  readonly tabs = input.required<TabItem[]>();
  protected readonly activeIndex = signal(0);
  protected readonly activeTab = computed(
    () => this.tabs()[this.activeIndex()] ?? this.tabs()[0],
  );

  protected selectTab(index: number): void {
    this.activeIndex.set(index);
  }
}
