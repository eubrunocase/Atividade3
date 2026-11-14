import { Injectable, signal } from '@angular/core';

export interface Gym {
  id: number;
  name: string;
  neighborhood: string;
  address: string;
  rating: number;
  monthlyPrice: number;
  classDuration: number;
  description: string;
  amenities: string[];
  classes: string[];
  hours: string[];
  phone: string;
}

const GYMS: Gym[] = [
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
    amenities: [
      'Vista para o mar',
      'Musculação',
      'Bicicletas ergométricas',
      'Bebedouro',
    ],
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
];

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
];

@Injectable({ providedIn: 'root' })
export class GymService {
  private readonly gymState = signal<Gym[]>(GYMS);

  readonly gyms = this.gymState.asReadonly();
  readonly neighborhoods = NEIGHBORHOODS;
}
