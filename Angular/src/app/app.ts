import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Accordion, AccordionItem } from './components/accordion/accordion';
import { DropdownMenu, DropdownOption } from './components/dropdown-menu/dropdown-menu';
import { Pagination } from './components/pagination/pagination';
import { ProgressBar } from './components/progress-bar/progress-bar';
import { Tabs, TabItem } from './components/tabs/tabs';
import { Toast } from './components/toast/toast';
import { RatingPipe } from './pipes/rating';
import { Gym, GymService } from './services/gym';
import { ToastService } from './services/toast';

const ALL_NEIGHBORHOODS = 'Todos os bairros';
const PAGE_SIZE = 3;

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    CurrencyPipe,
    RatingPipe,
    Accordion,
    Pagination,
    ProgressBar,
    Tabs,
    DropdownMenu,
    Toast,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnDestroy {
  private readonly gymService = inject(GymService);
  private readonly toastService = inject(ToastService);
  private reservationTimer: ReturnType<typeof setInterval> | null = null;

  readonly gyms = this.gymService.gyms;
  readonly faqItems: AccordionItem[] = [
    {
      title: 'Como faço para reservar uma aula?',
      content:
        'Escolha uma academia, clique em “Reservar aula” e acompanhe o envio da solicitação na barra de progresso. A confirmação aparece na tela em poucos segundos.',
    },
    {
      title: 'A reserva tem custo adicional?',
      content:
        'Não. A reserva está incluída no plano mensal da academia escolhida. Você paga apenas a mensalidade informada no cartão da academia.',
    },
    {
      title: 'Posso cancelar depois de reservar?',
      content:
        'Sim. O cancelamento pode ser feito até 2 horas antes do início da aula, sem cobrança. Depois desse prazo, a vaga é liberada para outra pessoa.',
    },
    {
      title: 'Quais bairros de Salvador estão disponíveis?',
      content:
        'Temos academias na Barra, Rio Vermelho, Pituba, Ondina, Itaipu, Bonfim, Imbuí, Stella Maris e Comércio. Use o filtro por bairro para encontrar a mais próxima.',
    },
    {
      title: 'Preciso levar algum documento?',
      content:
        'Para a primeira visita, leve um documento com foto. O cadastro é feito na recepção da academia e libera o acesso às aulas e à estrutura.',
    },
    {
      title: 'As aulas são para iniciantes?',
      content:
        'Sim. Todas as academias parceiras oferecem opções para iniciantes, com orientação de professores e intensidade adaptada ao seu ritmo.',
    },
  ];

  readonly searchQuery = signal('');
  readonly selectedNeighborhood = signal(ALL_NEIGHBORHOODS);
  readonly currentPage = signal(1);
  readonly selectedGym = signal<Gym>(this.gyms()[0]);
  readonly progress = signal(0);
  readonly isReserving = signal(false);
  searchTerm = '';

  readonly neighborhoodOptions = computed<DropdownOption[]>(() => [
    { label: ALL_NEIGHBORHOODS, value: ALL_NEIGHBORHOODS },
    ...this.gymService.neighborhoods.map((neighborhood) => ({
      label: neighborhood,
      value: neighborhood,
    })),
  ]);

  readonly filteredGyms = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const neighborhood = this.selectedNeighborhood();

    return this.gyms().filter((gym) => {
      const matchesNeighborhood =
        neighborhood === ALL_NEIGHBORHOODS || gym.neighborhood === neighborhood;
      const matchesQuery =
        query.length === 0 ||
        [gym.name, gym.neighborhood, gym.description].some((value) =>
          value.toLowerCase().includes(query),
        );

      return matchesNeighborhood && matchesQuery;
    });
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredGyms().length / PAGE_SIZE)),
  );

  readonly pagedGyms = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.filteredGyms().slice(start, start + PAGE_SIZE);
  });

  readonly detailTabs = computed<TabItem[]>(() => {
    const gym = this.selectedGym();

    return [
      { label: 'Estrutura', content: gym.amenities },
      { label: 'Aulas', content: gym.classes },
      { label: 'Horários', content: gym.hours },
      {
        label: 'Contato',
        content: [
          gym.address,
          `Telefone: ${gym.phone}`,
          'Reservas pelo site FitSalvador',
        ],
      },
    ];
  });

  readonly dropdownLabel = computed(() =>
    this.selectedNeighborhood() === ALL_NEIGHBORHOODS
      ? 'Filtrar por bairro'
      : this.selectedNeighborhood(),
  );

  readonly progressStatus = computed(() => {
    if (this.isReserving()) {
      return 'Enviando sua reserva para a academia...';
    }

    if (this.progress() === 100) {
      return 'Reserva concluída. Sua vaga foi solicitada.';
    }

    return 'Escolha uma academia e clique em “Reservar aula”.';
  });

  ngOnDestroy(): void {
    this.stopReservationTimer();
  }

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
    this.currentPage.set(1);
  }

  selectNeighborhood(option: DropdownOption): void {
    this.selectedNeighborhood.set(option.value);
    this.currentPage.set(1);
    this.toastService.info(
      option.value === ALL_NEIGHBORHOODS
        ? 'Mostrando todas as academias de Salvador.'
        : `Mostrando academias do bairro ${option.value}.`,
    );
  }

  selectGym(gym: Gym): void {
    this.selectedGym.set(gym);
  }

  changePage(page: number): void {
    this.currentPage.set(page);
  }

  reserve(gym: Gym): void {
    if (this.isReserving()) {
      this.toastService.error('Aguarde a conclusão da reserva em andamento.');
      return;
    }

    this.stopReservationTimer();
    this.selectedGym.set(gym);
    this.progress.set(0);
    this.isReserving.set(true);
    this.toastService.info(`Preparando sua reserva na ${gym.name}.`);

    this.reservationTimer = setInterval(() => {
      const nextValue = Math.min(100, this.progress() + 5);
      this.progress.set(nextValue);

      if (nextValue === 100) {
        this.stopReservationTimer();
        this.isReserving.set(false);
        this.toastService.success(
          `Reserva confirmada na ${gym.name}! Sua vaga foi solicitada com sucesso.`,
        );
      }
    }, 80);
  }

  private stopReservationTimer(): void {
    if (this.reservationTimer) {
      clearInterval(this.reservationTimer);
      this.reservationTimer = null;
    }
  }
}
