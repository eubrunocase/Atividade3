<script>
import Accordion from './components/Accordion.vue'
import DropdownMenu from './components/DropdownMenu.vue'
import Pagination from './components/Pagination.vue'
import ProgressBar from './components/ProgressBar.vue'
import Tabs from './components/Tabs.vue'
import Toast from './components/Toast.vue'
import { toastService } from './services/toastService.js'

const ALL_NEIGHBORHOODS = 'Todos os bairros'
const PAGE_SIZE = 3
const PRICE_FORMATTER = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

const GYMS = [
  {
    id: 1,
    name: 'Farol Fit',
    neighborhood: 'Barra',
    address: 'Rua do Farol, 45 – Barra, Salvador – BA',
    rating: 4.8,
    monthlyPrice: 129,
    classDuration: 50,
    description:
      'Treino com vista para o Farol da Barra, estrutura completa e horários flexíveis.',
    amenities: [
      'Musculação com equipamentos novos',
      'Sala de spinning',
      'Vestiário com chuveiro quente',
      'Wi-Fi liberado',
    ],
    classes: ['Musculação • 06h às 22h', 'Spinning • 07h, 12h e 18h', 'Funcional • 19h'],
    hours: [
      'Segunda a sexta: 05h30 às 23h',
      'Sábado: 07h às 18h',
      'Domingo: 08h às 13h',
    ],
    phone: '(71) 3345-1200',
  },
  {
    id: 2,
    name: 'Movimento Rio Vermelho',
    neighborhood: 'Rio Vermelho',
    address: 'Rua da Paciência, 210 – Rio Vermelho, Salvador – BA',
    rating: 4.7,
    monthlyPrice: 109,
    classDuration: 45,
    description:
      'Academia de bairro com aulas coletivas animadas e acompanhamento próximo dos professores.',
    amenities: [
      'Sala de musculação',
      'Estúdio de dança',
      'Armários individuais',
      'Avaliação física inclusa',
    ],
    classes: ['Dança • 18h', 'Circuito • 07h e 19h', 'Alongamento • 20h'],
    hours: ['Segunda a sexta: 06h às 22h', 'Sábado: 08h às 14h', 'Domingo: fechado'],
    phone: '(71) 3232-4410',
  },
  {
    id: 3,
    name: 'Pituba Prime Treino',
    neighborhood: 'Pituba',
    address: 'Avenida Manoel Dias da Silva, 980 – Pituba, Salvador – BA',
    rating: 4.9,
    monthlyPrice: 149,
    classDuration: 60,
    description:
      'Espaço amplo na Pituba com treino personalizado, área de recuperação e planos para todos os objetivos.',
    amenities: ['Equipamentos de força', 'Área de cardio', 'Sauna', 'Estacionamento'],
    classes: ['Treino funcional • 06h', 'HIIT • 12h e 18h', 'Pilates • 17h'],
    hours: [
      'Segunda a sexta: 05h às 23h',
      'Sábado: 08h às 18h',
      'Domingo: 08h às 12h',
    ],
    phone: '(71) 3112-7788',
  },
  {
    id: 4,
    name: 'Ondina Wave Gym',
    neighborhood: 'Ondina',
    address: 'Rua Adhemar de Barros, 320 – Ondina, Salvador – BA',
    rating: 4.6,
    monthlyPrice: 119,
    classDuration: 50,
    description:
      'Treino perto da orla de Ondina, com planos mensais acessíveis e aulas para todos os níveis.',
    amenities: ['Vista para o mar', 'Musculação', 'Bicicletas ergométricas', 'Bebedouro'],
    classes: ['Spinning • 07h e 18h', 'Funcional • 08h', 'Musculação livre • 06h às 22h'],
    hours: [
      'Segunda a sexta: 06h às 22h',
      'Sábado: 07h às 17h',
      'Domingo: 08h às 12h',
    ],
    phone: '(71) 3245-9030',
  },
  {
    id: 5,
    name: 'Itaipu Beach Club',
    neighborhood: 'Itaipu',
    address: 'Rua da Praia de Itaipu, 88 – Itaipu, Salvador – BA',
    rating: 4.8,
    monthlyPrice: 139,
    classDuration: 55,
    description:
      'Academia a poucos passos da praia de Itaipu, com treinos ao ar livre e estrutura coberta.',
    amenities: ['Área externa de treino', 'Vestiário', 'Sala de aulas', 'Estacionamento'],
    classes: ['Beach training • 07h', 'Musculação • 06h às 21h', 'Yoga • 18h'],
    hours: [
      'Segunda a sexta: 06h às 22h',
      'Sábado: 07h às 18h',
      'Domingo: 08h às 13h',
    ],
    phone: '(71) 3369-5522',
  },
  {
    id: 6,
    name: 'Bonfim Corpo & Axé',
    neighborhood: 'Bonfim',
    address: 'Largo do Bonfim, 76 – Bonfim, Salvador – BA',
    rating: 4.5,
    monthlyPrice: 89,
    classDuration: 45,
    description:
      'Ritmo, acolhimento e treino acessível no coração do Bonfim, com aulas em grupo todos os dias.',
    amenities: ['Sala de dança', 'Musculação', 'Vestiário', 'Aulas em grupo'],
    classes: ['Axé fitness • 19h', 'Musculação • 07h às 21h', 'Ginástica • 08h'],
    hours: ['Segunda a sexta: 07h às 21h', 'Sábado: 08h às 14h', 'Domingo: fechado'],
    phone: '(71) 3316-2040',
  },
  {
    id: 7,
    name: 'Imbuí Health Center',
    neighborhood: 'Imbuí',
    address: 'Avenida Luis Viana Filho, 412 – Imbuí, Salvador – BA',
    rating: 4.7,
    monthlyPrice: 159,
    classDuration: 60,
    description:
      'Centro de treinamento completo no Imbuí, com foco em saúde, performance e recuperação.',
    amenities: ['Avaliação física', 'Piscina', 'Sauna', 'Estacionamento'],
    classes: ['Natação • 07h e 18h', 'Musculação • 06h às 22h', 'Pilates • 16h'],
    hours: [
      'Segunda a sexta: 05h30 às 23h',
      'Sábado: 08h às 18h',
      'Domingo: 08h às 12h',
    ],
    phone: '(71) 3347-1180',
  },
  {
    id: 8,
    name: 'Stella Maris Fit',
    neighborhood: 'Stella Maris',
    address: 'Alameda do Sol, 150 – Stella Maris, Salvador – BA',
    rating: 4.9,
    monthlyPrice: 169,
    classDuration: 50,
    description:
      'Treino premium perto da praia de Stella Maris, com aulas exclusivas e horários estendidos.',
    amenities: [
      'Área de descanso',
      'Equipamentos importados',
      'Vestiário premium',
      'Estacionamento',
    ],
    classes: ['Funcional • 06h', 'Spinning • 18h', 'Mobilidade • 20h'],
    hours: [
      'Segunda a sexta: 06h às 23h',
      'Sábado: 07h às 19h',
      'Domingo: 08h às 14h',
    ],
    phone: '(71) 3378-6600',
  },
  {
    id: 9,
    name: 'Salvador Centro Ativo',
    neighborhood: 'Comércio',
    address: 'Avenida da França, 22 – Comércio, Salvador – BA',
    rating: 4.4,
    monthlyPrice: 79,
    classDuration: 45,
    description:
      'Opção econômica no Centro de Salvador, ideal para treinar antes ou depois do trabalho.',
    amenities: ['Musculação', 'Sala de cardio', 'Armários', 'Wi-Fi liberado'],
    classes: ['Musculação • 06h às 20h', 'Circuito • 12h', 'Alongamento • 17h'],
    hours: ['Segunda a sexta: 06h às 21h', 'Sábado: 08h às 13h', 'Domingo: fechado'],
    phone: '(71) 3321-7070',
  },
]

const NEIGHBORHOODS = [
  'Barra',
  'Rio Vermelho',
  'Pituba',
  'Ondina',
  'Itaipu',
  'Bonfim',
  'Imbuí',
  'Stella Maris',
  'Comércio',
]

const FAQ_ITEMS = [
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
]

export default {
  name: 'App',
  components: {
    Accordion,
    Pagination,
    ProgressBar,
    Tabs,
    DropdownMenu,
    Toast,
  },
  data() {
    return {
      gyms: [],
      faqItems: FAQ_ITEMS,
      searchTerm: '',
      selectedNeighborhood: ALL_NEIGHBORHOODS,
      currentPage: 1,
      pageSize: PAGE_SIZE,
      selectedGymId: null,
      progress: 0,
      isReserving: false,
      reservationTimer: null,
    }
  },
  computed: {
    neighborhoodOptions() {
      return [
        { label: ALL_NEIGHBORHOODS, value: ALL_NEIGHBORHOODS },
        ...NEIGHBORHOODS.map((neighborhood) => ({
          label: neighborhood,
          value: neighborhood,
        })),
      ]
    },
    filteredGyms() {
      const query = this.searchTerm.trim().toLowerCase()

      return this.gyms.filter((gym) => {
        const matchesNeighborhood =
          this.selectedNeighborhood === ALL_NEIGHBORHOODS ||
          gym.neighborhood === this.selectedNeighborhood
        const matchesQuery =
          query.length === 0 ||
          [gym.name, gym.neighborhood, gym.description].some((value) =>
            value.toLowerCase().includes(query),
          )

        return matchesNeighborhood && matchesQuery
      })
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredGyms.length / this.pageSize))
    },
    pagedGyms() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.filteredGyms.slice(start, start + this.pageSize)
    },
    selectedGym() {
      return this.gyms.find((gym) => gym.id === this.selectedGymId) || null
    },
    detailTabs() {
      const gym = this.selectedGym

      if (!gym) {
        return []
      }

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
      ]
    },
    dropdownLabel() {
      return this.selectedNeighborhood === ALL_NEIGHBORHOODS
        ? 'Filtrar por bairro'
        : this.selectedNeighborhood
    },
    progressStatus() {
      if (this.isReserving) {
        return 'Enviando sua reserva para a academia...'
      }

      if (this.progress === 100) {
        return 'Reserva concluída. Sua vaga foi solicitada.'
      }

      return 'Escolha uma academia e clique em “Reservar aula”.'
    },
  },
  created() {
    this.gyms = GYMS
  },
  mounted() {
    if (this.gyms.length > 0) {
      this.selectedGymId = this.gyms[0].id
    }
  },
  beforeUnmount() {
    this.stopReservationTimer()
  },
  methods: {
    onSearchChange() {
      this.currentPage = 1
    },
    selectNeighborhood(option) {
      this.selectedNeighborhood = option.value
      this.currentPage = 1
      toastService.info(
        option.value === ALL_NEIGHBORHOODS
          ? 'Mostrando todas as academias de Salvador.'
          : `Mostrando academias do bairro ${option.value}.`,
      )
    },
    selectGym(gym) {
      this.selectedGymId = gym.id
    },
    changePage(page) {
      this.currentPage = page
    },
    reserve(gym) {
      if (this.isReserving) {
        toastService.error('Aguarde a conclusão da reserva em andamento.')
        return
      }

      this.stopReservationTimer()
      this.selectedGymId = gym.id
      this.progress = 0
      this.isReserving = true
      toastService.info(`Preparando sua reserva na ${gym.name}.`)

      this.reservationTimer = setInterval(() => {
        this.progress = Math.min(100, this.progress + 5)

        if (this.progress === 100) {
          this.stopReservationTimer()
          this.isReserving = false
          toastService.success(
            `Reserva confirmada na ${gym.name}! Sua vaga foi solicitada com sucesso.`,
          )
        }
      }, 80)
    },
    stopReservationTimer() {
      if (this.reservationTimer) {
        clearInterval(this.reservationTimer)
        this.reservationTimer = null
      }
    },
    formatPrice(value) {
      return PRICE_FORMATTER.format(value)
    },
    formatRating(value) {
      return value.toFixed(1).replace('.', ',')
    },
  },
}
</script>

<template>
  <div class="page-shell">
    <header class="site-header">
      <div class="brand">
        <span class="brand-mark">FS</span>
        <span class="brand-name">Fit<span>Salvador</span></span>
      </div>
      <div class="header-location">
        <span class="location-dot" aria-hidden="true"></span>
        Salvador, BA
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="hero-content">
          <p class="eyebrow">Reservas de academia em Salvador</p>
          <h1>Seu próximo treino começa <span>aqui.</span></h1>
          <p class="hero-text">
            Encontre academias em bairros de Salvador, compare estruturas e reserve sua aula em
            poucos cliques.
          </p>
          <div class="hero-stats">
            <div>
              <strong>9</strong>
              <span>academias parceiras</span>
            </div>
            <div>
              <strong>9</strong>
              <span>bairros atendidos</span>
            </div>
            <div>
              <strong>45–60</strong>
              <span>minutos por aula</span>
            </div>
          </div>
        </div>

        <div class="hero-ticket" aria-hidden="true">
          <div class="ticket-top">
            <span class="ticket-dot"></span>
            Reserva confirmada
          </div>
          <p class="ticket-gym">Farol Fit</p>
          <div class="ticket-row">
            <span>Barra · Salvador</span>
            <strong>19h</strong>
          </div>
          <div class="ticket-divider"></div>
          <div class="ticket-footer">
            <span>Funcional</span>
            <span>50 min</span>
          </div>
        </div>
      </section>

      <section class="catalog-section">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Academias parceiras</p>
            <h2>Escolha onde treinar</h2>
          </div>
          <p class="section-note">{{ filteredGyms.length }} resultados</p>
        </div>

        <div class="catalog-toolbar">
          <label class="search-field">
            <span class="search-icon" aria-hidden="true"></span>
            <input
              v-model="searchTerm"
              type="search"
              name="academySearch"
              placeholder="Buscar academia ou bairro"
              aria-label="Buscar academia ou bairro"
              @input="onSearchChange"
            />
          </label>

          <DropdownMenu
            class="catalog-filter"
            :label="dropdownLabel"
            :options="neighborhoodOptions"
            @select="selectNeighborhood"
          />
        </div>

        <template v-if="pagedGyms.length > 0">
          <div class="gym-grid">
            <article
              v-for="gym in pagedGyms"
              :key="gym.id"
              class="gym-card"
              :class="{ 'is-selected': selectedGym && gym.id === selectedGym.id }"
            >
              <div class="gym-card-header">
                <span class="gym-neighborhood">{{ gym.neighborhood }}</span>
                <span class="gym-rating">★ {{ formatRating(gym.rating) }}</span>
              </div>
              <h3>{{ gym.name }}</h3>
              <p class="gym-description">{{ gym.description }}</p>
              <div class="gym-meta">
                <span>Aulas de {{ gym.classDuration }} min</span>
                <span class="gym-price">
                  {{ formatPrice(gym.monthlyPrice) }}
                  <small>/mês</small>
                </span>
              </div>
              <div class="gym-actions">
                <button type="button" class="button button-secondary" @click="selectGym(gym)">
                  Ver detalhes
                </button>
                <button type="button" class="button button-primary" @click="reserve(gym)">
                  Reservar aula
                </button>
              </div>
            </article>
          </div>

          <Pagination
            :total-pages="totalPages"
            :current-page="currentPage"
            @page-change="changePage"
          />
        </template>

        <div v-else class="empty-state">
          <p>Nenhuma academia encontrada com esses filtros.</p>
          <span>Tente outro nome ou escolha outro bairro.</span>
        </div>
      </section>

      <section v-if="selectedGym" class="details-section">
        <div class="details-panel">
          <div class="section-heading compact">
            <div>
              <p class="eyebrow">Conheça de perto</p>
              <h2>{{ selectedGym.name }}</h2>
            </div>
            <span class="details-neighborhood">{{ selectedGym.neighborhood }}</span>
          </div>
          <Tabs :tabs="detailTabs" />
        </div>

        <aside class="reservation-panel">
          <p class="eyebrow">Sua reserva</p>
          <h2>Pronto para treinar?</h2>
          <p class="reservation-gym">
            {{ selectedGym.name }}
            <span>{{ selectedGym.neighborhood }}</span>
          </p>
          <ProgressBar :value="progress" label="Progresso do envio" />
          <p class="reservation-status">{{ progressStatus }}</p>
          <p class="reservation-hint">
            Escolha uma academia na lista e clique em “Reservar aula”. O envio leva poucos segundos.
          </p>
        </aside>
      </section>

      <section class="faq-section">
        <div class="faq-heading">
          <p class="eyebrow">Dúvidas frequentes</p>
          <h2>Tudo sobre sua reserva</h2>
          <p class="faq-intro">
            As respostas para as perguntas mais comuns de quem treina com a FitSalvador.
          </p>
        </div>
        <Accordion :items="faqItems" />
      </section>
    </main>

    <footer class="site-footer">
      <div class="brand">
        <span class="brand-mark">FS</span>
        <span class="brand-name">Fit<span>Salvador</span></span>
      </div>
      <p>Reservas de academia em Salvador, Bahia.</p>
      <span>Projeto fictício para fins acadêmicos.</span>
    </footer>

    <Toast />
  </div>
</template>

<style scoped>
.site-header {
  width: min(calc(100% - 3rem), var(--max-width));
  margin: 0 auto;
  padding: 1.6rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.9rem;
  background: var(--ink);
  color: var(--cream);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.brand-name {
  font-size: 1.12rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.brand-name span {
  color: var(--ocean);
}

.header-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.9rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 253, 248, 0.7);
  color: var(--ink-soft);
  font-size: 0.86rem;
  font-weight: 600;
  white-space: nowrap;
}

.location-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--coral);
}

main {
  width: min(calc(100% - 3rem), var(--max-width));
  margin: 0 auto;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 5rem);
  padding: clamp(2.5rem, 6vw, 5.5rem) 0 clamp(3rem, 6vw, 5rem);
}

.eyebrow {
  margin: 0 0 0.9rem;
  color: var(--ocean);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.hero h1 {
  max-width: 11ch;
  margin-bottom: 1.4rem;
  font-size: clamp(2.8rem, 7vw, 5.4rem);
  font-weight: 800;
  letter-spacing: -0.055em;
  line-height: 0.94;
}

.hero h1 span {
  color: var(--coral);
}

.hero-text {
  max-width: 46ch;
  margin-bottom: 2rem;
  color: var(--ink-soft);
  font-size: 1.05rem;
  line-height: 1.7;
}

.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;
}

.hero-stats div {
  display: grid;
  gap: 0.15rem;
  padding-right: 1.6rem;
  border-right: 1px solid var(--line);
}

.hero-stats div:last-child {
  padding-right: 0;
  border-right: 0;
}

.hero-stats strong {
  font-size: 1.4rem;
  letter-spacing: -0.04em;
}

.hero-stats span {
  color: var(--ink-soft);
  font-size: 0.78rem;
}

.hero-ticket {
  position: relative;
  width: 100%;
  max-width: 360px;
  justify-self: end;
  padding: 1.7rem;
  border-radius: 2rem;
  background: var(--ink);
  color: var(--cream);
  transform: rotate(2.5deg);
}

.ticket-top {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 2.2rem;
  color: rgba(255, 253, 248, 0.7);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.ticket-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: #8dd9b0;
  box-shadow: 0 0 0 4px rgba(141, 217, 176, 0.15);
}

.ticket-gym {
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.ticket-row {
  display: flex;
  justify-content: space-between;
  color: rgba(255, 253, 248, 0.72);
  font-size: 0.9rem;
}

.ticket-divider {
  height: 1px;
  margin: 1.6rem 0;
  background: rgba(255, 253, 248, 0.15);
}

.ticket-footer {
  display: flex;
  justify-content: space-between;
  color: rgba(255, 253, 248, 0.65);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.catalog-section,
.details-section,
.faq-section {
  padding: clamp(2.4rem, 5vw, 4.5rem) 0;
  border-top: 1px solid var(--line);
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.8rem;
}

.section-heading .eyebrow,
.faq-heading .eyebrow {
  margin-bottom: 0.55rem;
}

.section-heading h2,
.faq-heading h2 {
  margin-bottom: 0;
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  letter-spacing: -0.045em;
}

.section-note {
  margin: 0 0 0.35rem;
  color: var(--ink-soft);
  font-size: 0.86rem;
  white-space: nowrap;
}

.catalog-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.8rem;
}

.search-field {
  flex: 1 1 280px;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.75rem 1.1rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--cream);
}

.search-field input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--ink);
}

.search-field input::placeholder {
  color: #8a989d;
}

.search-icon {
  position: relative;
  flex: 0 0 auto;
  width: 0.95rem;
  height: 0.95rem;
  border: 2px solid var(--ink-soft);
  border-radius: 50%;
}

.search-icon::after {
  content: '';
  position: absolute;
  right: -0.15rem;
  bottom: -0.3rem;
  width: 2px;
  height: 0.45rem;
  border-radius: 2px;
  background: var(--ink-soft);
  transform: rotate(-45deg);
}

.catalog-filter {
  flex: 0 1 230px;
}

.gym-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
}

.gym-card {
  display: flex;
  flex-direction: column;
  padding: 1.35rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--cream);
}

.gym-card.is-selected {
  border-color: var(--coral);
  box-shadow: 0 0 0 3px rgba(238, 122, 83, 0.12);
}

.gym-card-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.gym-neighborhood {
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: rgba(14, 107, 111, 0.09);
  color: var(--ocean-deep);
  font-size: 0.72rem;
  font-weight: 800;
}

.gym-rating {
  color: var(--coral-deep);
  font-size: 0.8rem;
  font-weight: 700;
}

.gym-card h3 {
  margin-bottom: 0.55rem;
  font-size: 1.25rem;
  letter-spacing: -0.03em;
}

.gym-description {
  flex: 1;
  margin-bottom: 1.25rem;
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.6;
}

.gym-meta {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.1rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--line);
  color: var(--ink-soft);
  font-size: 0.78rem;
}

.gym-price {
  color: var(--ink);
  font-size: 1.02rem;
  font-weight: 800;
  white-space: nowrap;
}

.gym-price small {
  margin-left: 0.1rem;
  color: var(--ink-soft);
  font-size: 0.65rem;
  font-weight: 600;
}

.gym-actions {
  display: flex;
  gap: 0.55rem;
}

.gym-actions .button {
  flex: 1;
}

.button {
  padding: 0.8rem 1rem;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 700;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.button-primary {
  background: var(--coral);
  color: #fff;
}

.button-primary:hover {
  background: var(--coral-deep);
}

.button-secondary {
  border-color: var(--line);
  background: transparent;
  color: var(--ink);
}

.button-secondary:hover {
  border-color: var(--ocean);
  color: var(--ocean);
}

.empty-state {
  padding: 3rem 1.5rem;
  border: 1px dashed var(--line);
  border-radius: var(--radius-md);
  text-align: center;
}

.empty-state p {
  margin-bottom: 0.4rem;
  font-weight: 700;
}

.empty-state span {
  color: var(--ink-soft);
  font-size: 0.9rem;
}

.details-section {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(280px, 0.8fr);
  align-items: start;
  gap: 1.4rem;
}

.details-panel,
.reservation-panel {
  padding: clamp(1.4rem, 3vw, 2.2rem);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--cream);
}

.section-heading.compact {
  margin-bottom: 1.4rem;
}

.details-neighborhood {
  padding: 0.4rem 0.7rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--ink-soft);
  font-size: 0.76rem;
  font-weight: 700;
  white-space: nowrap;
}

.reservation-panel h2 {
  margin-bottom: 1.2rem;
  font-size: 1.7rem;
  letter-spacing: -0.04em;
}

.reservation-gym {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin-bottom: 1.4rem;
  padding: 0.8rem 1rem;
  border-left: 3px solid var(--ocean);
  border-radius: 0.5rem;
  background: rgba(14, 107, 111, 0.06);
  font-size: 0.95rem;
  font-weight: 700;
}

.reservation-gym span {
  color: var(--ink-soft);
  font-size: 0.78rem;
  font-weight: 500;
}

.reservation-status {
  margin: 1rem 0 0.4rem;
  color: var(--ink);
  font-size: 0.86rem;
  font-weight: 600;
}

.reservation-hint {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.78rem;
  line-height: 1.6;
}

.faq-section {
  display: grid;
  grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.2fr);
  align-items: start;
  gap: clamp(2rem, 5vw, 5rem);
}

.faq-intro {
  max-width: 32ch;
  margin-top: 1rem;
  margin-bottom: 0;
  color: var(--ink-soft);
  font-size: 0.95rem;
  line-height: 1.7;
}

.site-footer {
  width: min(calc(100% - 3rem), var(--max-width));
  margin: 0 auto;
  padding: 2rem 0 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  border-top: 1px solid var(--line);
  color: var(--ink-soft);
  font-size: 0.8rem;
}

.site-footer p {
  margin: 0;
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero-ticket {
    max-width: 100%;
    justify-self: stretch;
    transform: none;
  }

  .gym-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .details-section {
    grid-template-columns: minmax(0, 1fr);
  }

  .faq-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .site-header,
  main,
  .site-footer {
    width: min(calc(100% - 2rem), var(--max-width));
  }

  .hero {
    padding-top: 2rem;
  }

  .hero h1 {
    max-width: 12ch;
  }

  .section-heading {
    align-items: start;
    flex-direction: column;
    gap: 0.5rem;
  }

  .gym-grid {
    grid-template-columns: 1fr;
  }

  .faq-section {
    gap: 2rem;
  }

  .site-footer {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .header-location {
    padding: 0.45rem 0.7rem;
    font-size: 0.75rem;
  }

  .brand-name {
    font-size: 1rem;
  }

  .hero-stats {
    gap: 1rem;
  }

  .hero-stats div {
    padding-right: 1rem;
  }

  .gym-actions {
    flex-direction: column;
  }

  .catalog-filter {
    flex: 1 1 100%;
  }
}
</style>
