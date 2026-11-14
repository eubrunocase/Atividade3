# Especificação do Projeto: Aplicação Web Responsiva com Angular (TypeScript) e Vue.js

## 1. Instruções ao agente

Este documento é a única fonte de verdade da atividade. Leia-o por completo antes de gerar qualquer artefato.

### 1.1 Escopo

- Siga apenas o que está descrito neste documento, e nada além disso.
- Não adicione componentes, páginas, funcionalidades, bibliotecas ou requisitos que não estejam listados aqui.
- Em caso de dúvida, não presuma. Implemente somente o que está escrito.

### 1.2 Regra sobre comentários no código

O código final não deve possuir comentários de nenhum tipo.

Isso é um requisito da atividade e vale para todos os arquivos gerados: TypeScript, JavaScript, HTML, CSS, arquivos `.vue` e arquivos de configuração. Esta regra tem prioridade sobre qualquer outra orientação de estilo.

- Não use comentários de linha (`//`).
- Não use comentários de bloco (`/* ... */`).
- Não use comentários em HTML ou em templates (`<!-- ... -->`).
- Não use blocos de documentação (JSDoc, TSDoc e similares).
- Não deixe marcações como `TODO`, `FIXME` ou `NOTE`.
- Não deixe código comentado.

Como o código não terá comentários, ele deve ser autoexplicativo:

- Use nomes claros e descritivos para variáveis, funções, classes, componentes, serviços e arquivos.
- Mantenha funções e componentes pequenos e com uma única responsabilidade.
- Use indentação consistente em todos os arquivos.

Antes de entregar, revise todos os arquivos, inclusive os gerados pelas ferramentas de inicialização (por exemplo, o `tsconfig.json` e os arquivos da pasta `.vscode` que o Angular CLI cria com comentários), e remova qualquer comentário que tenha restado.

### 1.3 Ponto de partida e organização dos arquivos

A pasta **`atividade3`** é o ponto de partida. Se o diretório de trabalho atual for a própria `atividade3`, crie as subpastas nele. Se o diretório de trabalho atual contiver uma pasta `atividade3`, trabalhe dentro dela. Não crie arquivos fora da `atividade3`.

Esta atividade tem duas aplicações, cada uma criada na sua subpasta:

```
atividade3/
├── Angular/
└── Vue/
```

Regras da organização:

- Crie os dois projetos dentro da pasta `atividade3`: a aplicação Angular em `atividade3/Angular` e a aplicação Vue.js em `atividade3/Vue`.
- As duas aplicações são independentes. Elas não compartilham nenhum arquivo, e nenhum arquivo de uma pasta pode referenciar arquivos da outra.
- As duas aplicações devem ter o mesmo tema, o mesmo conteúdo e os mesmos 6 componentes.

### 1.4 Versões das tecnologias

Use a versão estável mais recente de cada tecnologia. Não use versões de pré-lançamento (alpha, beta, `next` ou release candidate).

| Aplicação | Tecnologia | Versão a usar |
|---|---|---|
| `Angular` | Angular (com TypeScript) | A versão estável mais recente, a que o npm entrega na etiqueta `latest` do `@angular/core`. É a **versão 22** (major lançada em junho de 2026). A versão 23 só está prevista para junho de 2027 |
| `Angular` | Angular CLI | A versão estável mais recente, usada via `@angular/cli@latest` |
| `Vue` | Vue.js | A versão estável mais recente do Vue 3, a que o npm entrega na etiqueta `latest`. Em meados de outubro de 2026 era a **3.5.44**. A linha 3.6 ainda está em release candidate e **não deve ser usada** |
| `Vue` | Vite | A versão estável mais recente, obtida ao inicializar o projeto com `npm create vite@latest` |

Regras:

- Antes de instalar, confira as versões estáveis atuais com `npm view @angular/core version` e `npm view vue version`, e use essas versões, que podem ser mais novas que as da tabela.
- Se a versão do Node.js instalada não for compatível com a versão estável mais recente do Angular CLI, não use uma versão antiga do Angular. Avise a pessoa sobre a incompatibilidade.
- A aplicação `Angular` usa o **Angular moderno com TypeScript** (pacotes `@angular/*`). Não use o AngularJS (versão 1.x).

## 2. Tema e objetivo

**Objetivo:** desenvolver uma aplicação web responsiva, em duas versões:

- **Angular com TypeScript** (solução principal): aplicando os conceitos de arquitetura modular, componentes (que fazem o papel das diretivas), serviços, pipes e bindings, com um novo conjunto de componentes visuais.
- **Vue.js** (desafio extra, 0,3 ponto adicional): aplicando os conceitos de componentes, props, data, métodos, lifecycle hooks e event handling, com o mesmo conjunto de componentes visuais.

**Tema:** Reservas de academia na cidade de Salvador, BA.

Todo o conteúdo exibido nos componentes deve ser fictício, mas semanticamente relevante para o tema e para o tipo de componente. Cada componente deve demonstrar funcionalidade clara e propósito bem definido.

## 3. Condições comuns às duas aplicações

### 3.1 Responsividade

- A aplicação deve ser totalmente responsiva, adaptando-se a smartphones, tablets e desktops.
- O layout deve ser fluido e os elementos devem se reorganizar de forma adequada em diferentes resoluções de tela.

### 3.2 Componentes

A página deve incorporar, no mínimo, 6 componentes visuais distintos. Os componentes obrigatórios são:

| Componente | Descrição | Uso no tema |
|---|---|---|
| Acordeão (Accordion) | Seções de conteúdo expansíveis e colapsáveis | Perguntas frequentes sobre reservas de academia |
| Paginação (Pagination) | Navegação entre páginas de conteúdo | Listagem de academias de Salvador |
| Barra de Progresso (Progress Bar) | Indicador visual de progresso de uma tarefa | Progresso do envio de uma reserva |
| Abas (Tabs) | Organização de conteúdo em diferentes painéis | Detalhes de uma academia |
| Menu Suspenso (Dropdown Menu) | Seleção de uma opção a partir de uma lista | Filtro de academias por bairro |
| Notificação Toast (Toast Notification) | Mensagens temporárias de feedback para o usuário | Sucesso ou erro ao reservar |

### 3.3 Comportamento de cada componente

Itens marcados como **(opcional)** podem ser implementados ou não. Se implementar um item opcional, implemente-o nas duas aplicações.

**Acordeão**

- Múltiplos itens expansíveis e colapsáveis.
- Apenas um item aberto por vez (opcional, mas preferível: implemente).
- Transição suave ao expandir e colapsar.

**Paginação**

- Botões para navegar para a página anterior, a próxima e páginas específicas.
- Indicação da página atual.
- Desabilitação dos botões de anterior e próxima quando não aplicável.

**Barra de Progresso**

- Indicador visual do progresso, como o preenchimento de uma barra.
- Exibição do valor percentual **(opcional)**.

**Abas**

- Múltiplos títulos de abas clicáveis.
- Conteúdo correspondente a cada aba, exibido quando a aba é selecionada.

**Menu Suspenso**

- Um botão ou elemento clicável que revela uma lista de opções.
- Opções clicáveis, que podem disparar ações.
- Fechamento do menu ao selecionar uma opção ou ao clicar fora.

**Notificação Toast**

- Uma mensagem breve e informativa.
- Exibição temporária na tela, desaparecendo após alguns segundos ou ao ser fechada pelo usuário.
- Diferentes tipos: sucesso, erro e informação.

## 4. Aplicação 1: Angular (TypeScript)

Pasta: `atividade3/Angular/`

### 4.1 Tecnologia

- Utilize o **Angular** na versão estável mais recente (seção 1.4), com **TypeScript**.
- Crie o projeto com o Angular CLI mais recente e estável, dentro da pasta `Angular`. O CLI não aceita `angular` como nome de projeto, então use outro nome para o projeto e `Angular` como nome da pasta. Por exemplo, a partir da pasta `atividade3`: `npx @angular/cli@latest new atividade3-angular --directory Angular`. Consulte `ng new --help` para as opções da versão instalada.
- Durante a criação, escolha: estilos em **CSS**, **sem** roteamento, **sem** renderização no servidor (SSR) e **sem** arquivos de teste.
- Use os recursos padrão da versão instalada: componentes standalone (sem NgModules), signals para o estado, as funções `input()`, `output()` e `inject()`, e o fluxo de controle nativo dos templates (`@if` e `@for`).
- As transições devem ser feitas com CSS.
- Utilize apenas o Angular. Não adicione outras bibliotecas, como Angular Material, Bootstrap ou jQuery.

### 4.2 Estrutura da aplicação

A aplicação deve usar uma arquitetura modular do Angular, com estrutura clara. Deve incluir um componente raiz (`app`) que orquestra os demais componentes e serviços.

```
Angular/
└── src/
    └── app/
        ├── app            (componente raiz, que orquestra a página)
        ├── components/
        │   ├── accordion
        │   ├── pagination
        │   ├── progress-bar
        │   ├── tabs
        │   ├── dropdown-menu
        │   └── toast
        ├── services/
        │   ├── gym       (dados das academias)
        │   └── toast     (notificações)
        └── pipes/        (pipes de formatação)
```

- Cada componente fica na sua própria pasta, com arquivos de classe, template e estilos.
- Os nomes dos arquivos e das classes seguem as convenções do Angular CLI da versão instalada.
- O componente raiz é configurado no `main.ts` e no `app.config.ts`, sem NgModule.

### 4.3 Conceitos a demonstrar

O descritivo da atividade pede conceitos do AngularJS. Eles são demonstrados com os equivalentes do Angular moderno:

| Conceito do descritivo | Equivalente no Angular | Como demonstrar |
|---|---|---|
| Módulo principal (`app.js`) que orquestra módulos, controladores e serviços | Componente raiz `app` com `main.ts` e `app.config.ts` | O componente raiz importa os componentes, usa os serviços e monta a página |
| Diretivas e controladores | Componentes standalone e a classe do componente raiz | Os 6 componentes visuais e o componente raiz, que controla o estado da página |
| `$scope` e `ng-model` (two-way data binding) | `[(ngModel)]` (com `FormsModule`) | Pelo menos um campo com two-way binding, por exemplo um campo de busca que filtra a listagem de academias |
| Serviços e factories | Serviços com `@Injectable` e `inject()` | Um serviço para os dados das academias e um serviço para as notificações toast |
| Filtros | Pipes | Pelo menos um pipe para formatação de dados, do próprio Angular (como `currency` ou `date`) ou criado por você |
| Eventos (`ng-click`, `ng-change`) | `(click)`, `(ngModelChange)` e `(input)` | Uso de eventos nos botões e nos campos |

### 4.4 Implementação por componente (Angular)

Todos os componentes são componentes standalone, com entradas (`input()`) e saídas (`output()`).

| Componente | Implementação |
|---|---|
| Acordeão | Componente que gerencia, em um signal, qual item está aberto e recebe os títulos e conteúdos dos itens por `input()` |
| Paginação | Componente que recebe por `input()` o número total de páginas e a página atual, e emite um evento por `output()` para mudar de página |
| Barra de Progresso | Componente que recebe o progresso (0 a 100) por `input()` e atualiza a largura ou o preenchimento com base nesse valor |
| Abas | Componente que gerencia em um signal qual aba está ativa e exibe o conteúdo da aba selecionada. Títulos e conteúdos são recebidos por `input()` |
| Menu Suspenso | Componente que gerencia sua visibilidade em um signal e recebe as opções do menu por `input()`. Cada opção dispara uma ação por meio de `output()`. O clique fora do menu fecha o menu |
| Notificação Toast | Serviço que gerencia a lista de notificações (visibilidade e conteúdo), com um componente que as exibe. O tipo e a mensagem são parâmetros do serviço |

Cada componente deve ser independente, reutilizável e capaz de ser integrado a uma aplicação maior, sem depender do componente raiz.

## 5. Aplicação 2: Vue.js (desafio extra)

Pasta: `atividade3/Vue/`

### 5.1 Tecnologia

- Utilize o framework **Vue.js** na versão estável mais recente do Vue 3 (seção 1.4), com a **Options API** (`data`, `computed`, `methods`, `props` e lifecycle hooks), para demonstrar os conceitos pedidos.
- Inicialize o projeto com o **Vite** mais recente e estável, usando o template Vue em JavaScript, dentro da pasta `Vue`. Por exemplo, a partir da pasta `atividade3`: `npm create vite@latest Vue -- --template vue`.
- Durante a inicialização, escolha as opções estáveis. Não escolha opções experimentais ou beta e não inicie o servidor automaticamente.
- Utilize apenas o Vue.js e as dependências do template do Vite. Não adicione bibliotecas de UI. A estilização é feita com CSS próprio.

### 5.2 Estrutura da aplicação

A aplicação deve usar uma arquitetura baseada em componentes Vue, com estrutura clara e modular. Deve incluir um componente principal, `App.vue`, que orquestra os demais componentes.

```
Vue/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.js
    ├── App.vue
    ├── services/
    │   └── toastService.js
    └── components/
        ├── Accordion.vue
        ├── Pagination.vue
        ├── ProgressBar.vue
        ├── Tabs.vue
        ├── DropdownMenu.vue
        └── Toast.vue
```

Os arquivos gerados pelo Vite além dos listados (por exemplo, o `package-lock.json`) são aceitos. Arquivos de exemplo do template que não são usados devem ser removidos.

### 5.3 Conceitos a demonstrar

| Conceito | Como demonstrar |
|---|---|
| Criação e uso de componentes Vue | Os 6 componentes, orquestrados pelo `App.vue` |
| Props | Dados passados do `App.vue` para os componentes |
| Estado local com `data` e `computed` | `data` para o estado de cada componente e `computed` para valores derivados, como a lista filtrada e a página atual de academias |
| Eventos com `v-on` ou `@` e `$emit` | Componentes que emitem eventos para o pai, como a troca de página e a escolha de uma opção do menu |
| Lifecycle hooks | Uso de `created` e `mounted`, por exemplo para carregar os dados iniciais e para registrar o evento de clique fora do menu suspenso |

### 5.4 Implementação por componente (Vue)

Todos os componentes são componentes Vue, recebendo os dados por props.

| Componente | Implementação |
|---|---|
| Acordeão | Componente que gerencia o estado de qual item está aberto e recebe os títulos e conteúdos dos itens via props |
| Paginação | Componente que recebe via props o número total de páginas e a página atual, e emite um evento (`$emit`) para mudar de página |
| Barra de Progresso | Componente que recebe o progresso (0 a 100) via props e atualiza a largura ou o preenchimento com base nesse valor |
| Abas | Componente que gerencia em seu `data` qual aba está ativa e exibe o conteúdo da aba selecionada. Títulos e conteúdos são passados via props |
| Menu Suspenso | Componente que gerencia sua visibilidade via `data` e recebe as opções do menu via props. Cada opção dispara um callback por meio de `$emit` |
| Notificação Toast | Serviço globalmente acessível (`toastService.js`) que gerencia a lista de notificações, com o componente `Toast.vue` que as exibe. Recebe o tipo e a mensagem como parâmetros do serviço |

Cada componente deve ser independente e capaz de ser integrado a uma aplicação maior.

## 6. Restrições

- **Dependências:** o Angular (com as dependências que o Angular CLI instala) na aplicação Angular, e o Vue.js (com as dependências do template do Vite) na aplicação Vue. Não adicione outras bibliotecas ou frameworks.
- **Código limpo:** indentação consistente e nomes descritivos para variáveis, funções, classes e componentes. Sem comentários, conforme a seção 1.2.

## 7. Observações da atividade (para a pessoa, não para o agente)

- A solução em Angular é a principal. A solução em Vue.js é o desafio extra, que vale 0,3 ponto adicional.
- O GitHub Codespaces é permitido e recomendado para o desenvolvimento.
- A aplicação deve ser testada em diferentes resoluções: mobile, tablet e desktop.
- **Sobre o Angular:** o descritivo da atividade cita o AngularJS e conceitos como `$scope`, factories e `ng-click`. Esta especificação usa o Angular moderno com TypeScript, por decisão sua, e traduz esses conceitos para os equivalentes (seção 4.3). Vale confirmar com o professor que essa troca é aceita.

## 8. Checklist de entrega

- [ ] As duas aplicações foram criadas dentro da pasta `atividade3`: `Angular` e `Vue`.
- [ ] Nenhum arquivo de uma aplicação depende de arquivos da outra.
- [ ] Apenas o que consta neste documento foi implementado.
- [ ] Os 6 componentes estão presentes e funcionais nas duas aplicações: Acordeão, Paginação, Barra de Progresso, Abas, Menu Suspenso e Notificação Toast.
- [ ] Cada componente segue as regras da seção 3.3 e usa conteúdo fictício do tema.
- [ ] **Angular:** usa a versão estável mais recente do Angular com TypeScript (não o AngularJS), criada com o Angular CLI, com componentes standalone e o componente raiz orquestrando a página.
- [ ] **Angular:** demonstra `[(ngModel)]`, serviços com `inject()`, pipes e eventos, conforme a seção 4.3.
- [ ] **Angular:** usa signals, `input()` e `output()`, e as transições são feitas com CSS.
- [ ] **Angular:** usa apenas o Angular, sem outras bibliotecas.
- [ ] **Vue:** usa a versão estável mais recente do Vue 3 (não a linha 3.6 em release candidate) com a Options API, inicializado com o Vite mais recente e estável, com `App.vue` orquestrando os componentes.
- [ ] **Vue:** demonstra props, `data`, `computed`, eventos com `@` e `$emit`, e os lifecycle hooks `created` e `mounted`.
- [ ] **Vue:** não usa bibliotecas de UI.
- [ ] O layout é responsivo em mobile, tablet e desktop nas duas aplicações.
- [ ] Nenhum arquivo de código ou de configuração contém comentários de qualquer tipo.