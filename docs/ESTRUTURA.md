# Estrutura do Projeto

## Visão Geral da Arquitetura de Pastas

```
CS-APP-Clube-Scania/
├── android/                    # Código nativo Android
├── ios/                        # Código nativo iOS
├── assets/                     # Assets globais (ícones, splash)
├── src/                        # Código fonte principal
│   ├── @types/                 # Declarações de tipo TypeScript
│   ├── assets/                 # Assets do app (imagens)
│   ├── components/             # Componentes reutilizáveis
│   ├── contexts/               # Contextos React (estado global)
│   ├── global/                 # Estilos e temas globais
│   ├── interfaces/             # Interfaces TypeScript
│   ├── languages/              # Arquivos de tradução (i18n)
│   ├── routes/                 # Configuração de navegação
│   ├── screens/                # Telas do aplicativo
│   ├── services/               # Serviços de API
│   └── utils/                  # Utilitários
├── App.tsx                     # Componente raiz
├── app.json                    # Configuração Expo
├── eas.json                    # Configuração EAS Build
├── package.json                # Dependências
├── tsconfig.json               # Configuração TypeScript
└── babel.config.js             # Configuração Babel
```

---

## Detalhamento das Pastas

### `/src/@types`

Declarações de tipo para módulos que não possuem tipos nativos.

**Arquivos**:
- `calendar.d.ts` - Tipos para biblioteca de calendário
- `jpeg.d.ts` - Tipos para importação de imagens JPEG
- `png.d.ts` - Tipos para importação de imagens PNG
- `switchselector.d.ts` - Tipos para componente de switch

### `/src/assets/images`

Imagens e recursos visuais utilizados no aplicativo.

**Organização recomendada**:
- Ícones
- Logos
- Imagens de fundo
- Placeholders

### `/src/components`

Componentes reutilizáveis do aplicativo. Cada componente possui sua própria pasta.

**Componentes principais**:

| Componente | Descrição |
|------------|-----------|
| `AlertCustom` | Alertas personalizados |
| `AvatarProfessional` | Avatar de profissionais |
| `BannerActivity` | Banner de atividades |
| `BannerPromotion` | Banner promocional |
| `ButtonBack` | Botão de voltar |
| `ButtonBook` | Botão de reservar |
| `ButtonLike` | Botão de curtir |
| `ButtonLogin` | Botão de login |
| `ButtonStandard` | Botão padrão |
| `Card` | Card genérico |
| `Category` | Categoria de itens |
| `DishCard` | Card de pratos |
| `ExamCard` | Card de exames |
| `FormReserve` | Formulário de reserva |
| `Header` | Cabeçalho das telas |
| `HourList` | Lista de horários |
| `Input` | Campo de entrada padrão |
| `InputDate` | Seletor de data |
| `InputPassword` | Campo de senha |
| `ItemGroupReserve` | Agrupamento de reservas |
| `ItemList` | Item de lista genérico |
| `ItemListActivity` | Item de lista de atividades |
| `ItemListContact` | Item de lista de contatos |
| `ItemListHours` | Item de lista de horários |
| `ItemListTraining` | Item de lista de treinos |
| `Photo` | Componente de foto |
| `SeachBar` | Barra de pesquisa |
| `SelectButton` | Botão de seleção |
| `TrainingSelectButton` | Seleção de treino |

**Estrutura típica de um componente**:

```
ComponentName/
├── index.tsx       # Componente principal
└── styles.ts       # Estilos (Styled Components)
```

### `/src/contexts`

Gerenciamento de estado global usando Context API.

**Arquivo**: `auth.tsx`

**Responsabilidades**:
- Autenticação de usuário
- Gerenciamento de sessão
- Armazenamento de token
- Informações do usuário logado
- Idioma da aplicação

### `/src/global/styles`

Estilos e temas globais do aplicativo.

**Arquivo**: `theme.ts`

**Cores principais**:
```typescript
{
  primaryRed: '#D90404',
  primaryBlue: '#1F2C73',
  primaryBlue_light: '#4B568F',
  primarySecondRed: '#F20530',
  typographyOnyx: '#1B1C20',
  typographySnow: '#FFF',
  secundaryIce: '#F0F3F4',
  secundaryFossil: '#C8D1D3',
  secundarySand: '#F2F2F2'
}
```

**Fontes**:
- Montserrat (500, 600, 700)
- Roboto (300, 500, 700)

### `/src/interfaces`

Interfaces TypeScript para tipagem forte.

**Arquivo**: `interfaces.ts`

**Principais interfaces**:
- `User` - Dados do usuário
- `JWT` - Resposta de autenticação
- `Activity` - Atividades físicas
- `Event` - Eventos
- `Banner` - Banners promocionais
- `ScheduleActivity` - Agendamento de atividades
- `Professional` - Profissionais do centro estético
- `ExamsProps` - Exames médicos
- `SnackBarProps` - Lanchonete
- E muitas outras...

### `/src/languages`

Sistema de internacionalização (i18n).

**Arquivos**:
- `i18n.js` - Configuração do i18next
- `portuguese.json` - Traduções em português
- `english.json` - Traduções em inglês
- `translateDB.js` - Traduções de dados do banco

**Idiomas suportados**:
- Português (pt)
- Inglês (en)

### `/src/routes`

Configuração de navegação do aplicativo.

**Arquivos**:
- `index.tsx` - Router principal (escolhe entre auth e app routes)
- `auth.routes.tsx` - Rotas de autenticação
- `app.routes.tsx` - Rotas do aplicativo autenticado

### `/src/screens`

Telas do aplicativo. Cada tela possui sua própria pasta.

**Telas principais** (37 telas no total):

| Categoria | Telas |
|-----------|-------|
| **Autenticação** | SignIn, SignUp, ForgotPassword |
| **Home** | Home |
| **Perfil** | MenuProfile, Profile, ChangePassword, Settings, Language |
| **Atividades** | Activitys, ActivityDetail, ActivityReserve, ActivitysHistory, ActivityHistoryDetail, TrainingHistory, ExerciseDetail, OtherActivitys, OtherActivitiesWithoutAppointments, TrainingSelect, ExamActivitySelect |
| **Centro Estético** | BeautyCenter, BeautyCenterReserve, BeautyCenterHistory, SelectProfessional |
| **Eventos** | Events, EventDetail, EventReserve |
| **Exames** | Exams, ExamDetail, ExamAddAttachment |
| **Lanchonete** | Snack, SnackBar, SnackBarItems |
| **Espaços** | Reserves, Squares, Kiosks, AgreeTermsReserves |
| **Outros** | Payment |

### `/src/services`

Serviços de comunicação com a API backend.

**Arquivos**:
- `api.ts` - Configuração do Axios
- `auth.ts` - Serviços de autenticação
- `user.ts` - Serviços de usuário
- `home.ts` - Dados da home
- `activity.ts` - Atividades físicas
- `academy.ts` - Academia
- `beautyCenter.ts` - Centro estético
- `events.ts` - Eventos
- `exams.ts` - Exames
- `snackBar.ts` - Lanchonete
- `space.ts` - Espaços
- `register.ts` - Cadastro

### `/src/utils`

Funções utilitárias e helpers.

---

## Arquivos de Configuração Raiz

### `App.tsx`

Componente principal que:
- Carrega fontes customizadas
- Configura navegação
- Provê contextos globais
- Gerencia SplashScreen

### `app.json`

Configurações do Expo:
- Metadados do app
- Configurações de build
- Plugins
- Permissões

### `eas.json`

Configuração para builds com EAS:
- Perfis de build (development, preview, production)
- Configurações de distribuição

### `package.json`

- Dependências do projeto
- Scripts de execução
- Metadados do projeto

---

## Convenções de Código

### Nomenclatura de Arquivos

- Componentes: PascalCase (ex: `ButtonStandard`)
- Serviços: camelCase (ex: `auth.ts`)
- Utilitários: camelCase
- Estilos: `styles.ts`

### Estrutura de Componentes

```typescript
// index.tsx
import React from 'react';
import { Container, Title } from './styles';

interface Props {
  title: string;
}

export function ComponentName({ title }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}
```

```typescript
// styles.ts
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #1F2C73;
`;
```

### Importações

Ordem recomendada:
1. Bibliotecas React/React Native
2. Bibliotecas de terceiros
3. Componentes locais
4. Serviços
5. Utils
6. Tipos/Interfaces
7. Estilos

---

## Próximos Passos

- [Arquitetura e Fluxo de Dados](./ARQUITETURA.md)
- [Guia de Componentes](./COMPONENTES.md)
- [Documentação de Telas](./PAGINAS.md)
