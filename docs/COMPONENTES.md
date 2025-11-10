# Componentes

## Visão Geral

O projeto possui **29 componentes reutilizáveis** localizados em `src/components/`. Cada componente segue o padrão de ter sua própria pasta com `index.tsx` e `styles.ts`.

---

## Estrutura Padrão

```
ComponentName/
├── index.tsx       # Lógica e JSX do componente
└── styles.ts       # Estilos com Styled Components
```

### Exemplo de Implementação

```typescript
// index.tsx
import React from 'react';
import { Container, Title } from './styles';

interface Props {
  title: string;
  onPress?: () => void;
}

export function ComponentName({ title, onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
}
```

```typescript
// styles.ts
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  padding: ${RFValue(16)}px;
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  border-radius: ${RFValue(8)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.montserrat600};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.typographySnow};
`;
```

---

## Componentes de UI

### AlertCustom

**Descrição**: Alertas e diálogos customizados para mensagens ao usuário.

**Props**:
```typescript
interface Props {
  visible: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onConfirm?: () => void;
  onCancel?: () => void;
}
```

**Uso**:
```typescript
<AlertCustom 
  visible={showAlert}
  title="Sucesso"
  message="Agendamento realizado!"
  type="success"
  onConfirm={() => setShowAlert(false)}
/>
```

---

### Card

**Descrição**: Card genérico para exibir conteúdo agrupado.

**Props**:
```typescript
interface Props {
  children: React.ReactNode;
  onPress?: () => void;
  elevation?: number;
}
```

**Uso**:
```typescript
<Card onPress={() => navigate('Detail')}>
  <Title>Conteúdo</Title>
</Card>
```

---

### Header

**Descrição**: Cabeçalho padrão das telas com título e botão voltar.

**Props**:
```typescript
interface Props {
  title: string;
  showBack?: boolean;
  showConfig?: boolean;
  onBackPress?: () => void;
}
```

**Uso**:
```typescript
<Header 
  title="Atividades"
  showBack={true}
  showConfig={false}
/>
```

---

## Componentes de Formulário

### Input

**Descrição**: Campo de entrada de texto padrão.

**Props**:
```typescript
interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  editable?: boolean;
  error?: string;
}
```

**Uso**:
```typescript
<Input 
  placeholder="Digite seu e-mail"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  autoCapitalize="none"
  error={emailError}
/>
```

---

### InputPassword

**Descrição**: Campo de entrada de senha com toggle de visibilidade.

**Props**:
```typescript
interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}
```

**Uso**:
```typescript
<InputPassword 
  placeholder="Senha"
  value={password}
  onChangeText={setPassword}
  error={passwordError}
/>
```

---

### InputDate

**Descrição**: Seletor de data com calendário.

**Props**:
```typescript
interface Props {
  value: Date;
  onChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  placeholder?: string;
}
```

**Uso**:
```typescript
<InputDate 
  value={selectedDate}
  onChange={setSelectedDate}
  minimumDate={new Date()}
  placeholder="Selecione uma data"
/>
```

---

### SearchBar

**Descrição**: Barra de pesquisa com ícone.

**Props**:
```typescript
interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onSearch?: () => void;
}
```

**Uso**:
```typescript
<SearchBar 
  placeholder="Buscar atividade..."
  value={searchText}
  onChangeText={setSearchText}
  onSearch={handleSearch}
/>
```

---

## Componentes de Botão

### ButtonStandard

**Descrição**: Botão padrão do aplicativo.

**Props**:
```typescript
interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}
```

**Uso**:
```typescript
<ButtonStandard 
  title="Agendar"
  onPress={handleSchedule}
  variant="primary"
  loading={isLoading}
/>
```

---

### ButtonLogin

**Descrição**: Botão específico para login com loading animation.

**Props**:
```typescript
interface Props {
  onPress: () => void;
  loading?: boolean;
}
```

**Uso**:
```typescript
<ButtonLogin 
  onPress={handleLogin}
  loading={isLoggingIn}
/>
```

---

### ButtonBack

**Descrição**: Botão de voltar.

**Props**:
```typescript
interface Props {
  onPress?: () => void;
  color?: string;
}
```

**Uso**:
```typescript
<ButtonBack 
  onPress={() => navigation.goBack()}
  color="#1F2C73"
/>
```

---

### ButtonBook

**Descrição**: Botão para realizar reserva/agendamento.

**Props**:
```typescript
interface Props {
  onPress: () => void;
  disabled?: boolean;
  title?: string;
}
```

**Uso**:
```typescript
<ButtonBook 
  onPress={handleBooking}
  disabled={!selectedTime}
  title="Reservar"
/>
```

---

### ButtonLike

**Descrição**: Botão de curtir atividades.

**Props**:
```typescript
interface Props {
  isLiked: boolean;
  onPress: () => void;
  activityId: string;
}
```

**Uso**:
```typescript
<ButtonLike 
  isLiked={activity.isLiked}
  onPress={handleLike}
  activityId={activity.id}
/>
```

---

### SelectButton

**Descrição**: Botão de seleção (radio/checkbox visual).

**Props**:
```typescript
interface Props {
  title: string;
  selected: boolean;
  onPress: () => void;
}
```

**Uso**:
```typescript
<SelectButton 
  title="Manhã"
  selected={period === 'morning'}
  onPress={() => setPeriod('morning')}
/>
```

---

### TrainingSelectButton

**Descrição**: Botão de seleção específico para fichas de treino.

**Props**:
```typescript
interface Props {
  training: SheetTrainingProps;
  selected: boolean;
  onPress: () => void;
}
```

**Uso**:
```typescript
<TrainingSelectButton 
  training={trainingSheet}
  selected={selectedTraining?.id === trainingSheet.id}
  onPress={() => setSelectedTraining(trainingSheet)}
/>
```

---

## Componentes de Lista

### ItemList

**Descrição**: Item genérico de lista.

**Props**:
```typescript
interface Props {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

**Uso**:
```typescript
<ItemList 
  title="Configurações"
  subtitle="Gerencie suas preferências"
  onPress={() => navigate('Settings')}
  rightIcon={<ChevronRight />}
/>
```

---

### ItemListActivity

**Descrição**: Item de lista específico para atividades.

**Props**:
```typescript
interface Props {
  activity: ActivitySchedule;
  onPress?: () => void;
  onCancel?: () => void;
}
```

**Uso**:
```typescript
<ItemListActivity 
  activity={scheduledActivity}
  onPress={() => navigate('ActivityDetail', { id: activity.id })}
  onCancel={handleCancelSchedule}
/>
```

---

### ItemListHours

**Descrição**: Item de lista de horários disponíveis.

**Props**:
```typescript
interface Props {
  schedule: ScheduleActivity;
  selected: boolean;
  onPress: () => void;
}
```

**Uso**:
```typescript
<ItemListHours 
  schedule={timeSlot}
  selected={selectedTime?.id === timeSlot.id}
  onPress={() => setSelectedTime(timeSlot)}
/>
```

---

### ItemListTraining

**Descrição**: Item de lista de treinos/exercícios.

**Props**:
```typescript
interface Props {
  exercise: ExerciseProps;
  onPress?: () => void;
}
```

**Uso**:
```typescript
<ItemListTraining 
  exercise={exercise}
  onPress={() => navigate('ExerciseDetail', { id: exercise.id })}
/>
```

---

### ItemListContact

**Descrição**: Item de lista de contatos.

**Props**:
```typescript
interface Props {
  contact: Contact;
  onPress?: () => void;
}
```

**Uso**:
```typescript
<ItemListContact 
  contact={contact}
  onPress={() => Linking.openURL(`tel:${contact.phone}`)}
/>
```

---

### ItemGroupReserve

**Descrição**: Agrupamento de reservas por data.

**Props**:
```typescript
interface Props {
  date: string;
  reservations: SpaceSchedule[];
  onCancelReservation?: (id: string) => void;
}
```

**Uso**:
```typescript
<ItemGroupReserve 
  date="2025-11-10"
  reservations={todayReservations}
  onCancelReservation={handleCancel}
/>
```

---

### HourList

**Descrição**: Lista completa de horários disponíveis.

**Props**:
```typescript
interface Props {
  schedules: ScheduleActivity[];
  selectedSchedule?: ScheduleActivity;
  onSelectSchedule: (schedule: ScheduleActivity) => void;
}
```

**Uso**:
```typescript
<HourList 
  schedules={availableSlots}
  selectedSchedule={selectedSlot}
  onSelectSchedule={setSelectedSlot}
/>
```

---

## Componentes de Exibição

### BannerPromotion

**Descrição**: Carrossel de banners promocionais.

**Props**:
```typescript
interface Props {
  banners: Banner[];
  onPressBanner?: (banner: Banner) => void;
}
```

**Uso**:
```typescript
<BannerPromotion 
  banners={homeBanners}
  onPressBanner={handleBannerPress}
/>
```

---

### BannerActivity

**Descrição**: Banner de atividade individual.

**Props**:
```typescript
interface Props {
  activity: Activity;
  onPress?: () => void;
}
```

**Uso**:
```typescript
<BannerActivity 
  activity={featuredActivity}
  onPress={() => navigate('ActivityDetail', { id: activity.id })}
/>
```

---

### Category

**Descrição**: Card de categoria de atividades/serviços.

**Props**:
```typescript
interface Props {
  title: string;
  title_EN?: string;
  icon: React.ReactNode;
  onPress: () => void;
}
```

**Uso**:
```typescript
<Category 
  title="Academia"
  title_EN="Gym"
  icon={<DumbbellIcon />}
  onPress={() => navigate('Gym')}
/>
```

---

### DishCard

**Descrição**: Card de prato do cardápio.

**Props**:
```typescript
interface Props {
  dish: DishOfDayProps | SnackBarItem;
  onPress?: () => void;
}
```

**Uso**:
```typescript
<DishCard 
  dish={dishOfDay}
  onPress={() => navigate('DishDetail', { id: dish.id })}
/>
```

---

### ExamCard

**Descrição**: Card de exame médico.

**Props**:
```typescript
interface Props {
  exam: ExamsProps;
  onPress?: () => void;
}
```

**Uso**:
```typescript
<ExamCard 
  exam={medicalExam}
  onPress={() => navigate('ExamDetail', { id: exam.id })}
/>
```

---

### AvatarProfessional

**Descrição**: Avatar de profissional (centro estético).

**Props**:
```typescript
interface Props {
  professional: Professional;
  selected: boolean;
  onPress: () => void;
}
```

**Uso**:
```typescript
<AvatarProfessional 
  professional={professional}
  selected={selectedPro?.id === professional.id}
  onPress={() => setSelectedPro(professional)}
/>
```

---

### Photo

**Descrição**: Componente de exibição/seleção de foto.

**Props**:
```typescript
interface Props {
  imageUri?: string;
  onSelectPhoto?: () => void;
  editable?: boolean;
  size?: number;
}
```

**Uso**:
```typescript
<Photo 
  imageUri={user.imgPerfil}
  onSelectPhoto={handleSelectPhoto}
  editable={true}
  size={120}
/>
```

---

## Componentes de Formulário Complexo

### FormReserve

**Descrição**: Formulário completo de reserva de espaços.

**Props**:
```typescript
interface Props {
  spaceId: string;
  onSubmit: (data: ReserveFormData) => void;
  loading?: boolean;
}
```

**Uso**:
```typescript
<FormReserve 
  spaceId={space.id}
  onSubmit={handleReserve}
  loading={isSubmitting}
/>
```

---

## Boas Práticas de Uso

### 1. Tipagem

Sempre defina interfaces para props:

```typescript
interface Props {
  title: string;
  onPress: () => void;
  optional?: boolean;
}

export function Component({ title, onPress, optional = false }: Props) {
  // ...
}
```

### 2. Props Opcionais

Use valores padrão:

```typescript
export function Button({ 
  title, 
  variant = 'primary',
  disabled = false 
}: Props) {
  // ...
}
```

### 3. Internacionalização

Use `useTranslation` para textos:

```typescript
import { useTranslation } from 'react-i18next';

export function Component() {
  const { t } = useTranslation();
  
  return <Title>{t("Título")}</Title>;
}
```

### 4. Temas

Acesse cores e fontes via theme:

```typescript
export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.primaryBlue};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.montserrat600};
  color: ${({ theme }) => theme.colors.typographySnow};
`;
```

### 5. Responsividade

Use `RFValue` para fontes:

```typescript
import { RFValue } from 'react-native-responsive-fontsize';

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
`;
```

### 6. Callbacks

Sempre use `useCallback` para funções passadas como props:

```typescript
const handlePress = useCallback(() => {
  // lógica
}, [dependencies]);

<Component onPress={handlePress} />
```

---

## Criando Novos Componentes

### Template

```typescript
// src/components/NewComponent/index.tsx
import React from 'react';
import { Container, Title } from './styles';

interface Props {
  title: string;
  onPress?: () => void;
}

export function NewComponent({ title, onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
}
```

```typescript
// src/components/NewComponent/styles.ts
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  padding: ${RFValue(16)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.montserrat600};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.typographyOnyx};
`;
```

---

## Próximos Passos

- [Guia de Telas/Páginas](./PAGINAS.md)
- [Navegação](./NAVEGACAO.md)
- [Estilos e Temas](./ARQUITETURA.md)
