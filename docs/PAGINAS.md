# Telas e Páginas

## Visão Geral

O aplicativo possui **37 telas** divididas em fluxos de autenticação e aplicação autenticada.

---

## Fluxo de Autenticação

### SignIn

**Caminho**: `src/screens/SignIn`

**Descrição**: Tela de login.

**Funcionalidades**:
- Login com CPF/E-mail e senha
- Opção "Esqueceu a senha?"
- Link para criar conta
- Seleção de idioma

**Campos**:
- Username (CPF ou e-mail)
- Senha

**Navegação**:
- Para `SignUp` ao clicar em "Criar conta"
- Para `ForgotPassword` ao clicar em "Esqueceu a senha?"
- Para `Home` após login bem-sucedido

**Validações**:
- Username obrigatório
- Senha obrigatória
- Feedback de erro do backend

---

### SignUp

**Caminho**: `src/screens/SignUp`

**Descrição**: Tela de cadastro de novo usuário.

**Funcionalidades**:
- Cadastro de novo associado
- Validação de CPF
- Validação de e-mail
- Confirmação de senha

**Campos**:
- Nome completo
- CPF
- E-mail
- Data de nascimento
- Celular
- Senha
- Confirmação de senha

**Validações**:
- Todos os campos obrigatórios
- CPF válido
- E-mail válido
- Senhas devem coincidir
- Senha mínima de 6 caracteres

**Navegação**:
- Para `SignIn` após cadastro bem-sucedido
- Botão voltar para `SignIn`

---

### ForgotPassword

**Caminho**: `src/screens/ForgotPassword`

**Descrição**: Recuperação de senha.

**Funcionalidades**:
- Solicitar redefinição de senha via e-mail

**Campos**:
- E-mail

**Validações**:
- E-mail obrigatório
- E-mail válido

**Navegação**:
- Volta para `SignIn` após envio

---

## Tela Principal (Home)

### Home

**Caminho**: `src/screens/Home`

**Descrição**: Tela inicial do app após login.

**Seções**:
1. **Header**: Saudação e avatar do usuário
2. **Banners Promocionais**: Carrossel de banners
3. **Categorias**: Grid de acesso rápido
   - Academia
   - Atividades
   - Centro Estético
   - Eventos
   - Lanchonete
   - Espaços
   - Outros
4. **Atividades Curtidas**: Lista de atividades favoritas

**Navegação**:
- Academia → `Activitys` (tipo: academia)
- Atividades → `Activitys` (tipo: atividades)
- Centro Estético → `BeautyCenter`
- Eventos → `Events`
- Lanchonete → `SnackBar`
- Espaços → `Reserves`
- Quadras → `Squares`
- Quiosques → `Kiosks`

---

## Módulo de Atividades

### Activitys

**Caminho**: `src/screens/Activitys`

**Descrição**: Lista de atividades disponíveis (academia, natação, etc).

**Funcionalidades**:
- Visualizar atividades por categoria
- Curtir/descurtir atividades
- Buscar atividades

**Componentes**:
- `SearchBar`
- `BannerActivity`
- Lista de atividades com imagem e descrição

**Navegação**:
- Para `ActivityDetail` ao clicar em atividade

---

### ActivityDetail

**Caminho**: `src/screens/ActivityDetail`

**Descrição**: Detalhes de uma atividade específica.

**Informações exibidas**:
- Imagem da atividade
- Título e subtítulo
- Descrição completa
- Botão de reservar (se necessário agendamento)
- Informações adicionais

**Parâmetros de navegação**:
```typescript
{
  id: string,
  title: string,
  type?: string
}
```

**Navegação**:
- Para `ActivityReserve` se requer agendamento
- Para `ExamActivitySelect` se requer exame

---

### ActivityReserve

**Caminho**: `src/screens/ActivityReserve`

**Descrição**: Agendamento de atividade.

**Funcionalidades**:
- Selecionar data
- Selecionar horário disponível
- Ver vagas disponíveis
- Confirmar agendamento

**Componentes**:
- Calendário de datas
- `HourList` (horários disponíveis)
- `ButtonBook`

**Fluxo**:
1. Selecionar data
2. Carregar horários disponíveis
3. Selecionar horário
4. Confirmar agendamento
5. Exibir sucesso/erro

**Navegação**:
- Para `ActivitysHistory` após agendamento bem-sucedido

---

### ActivitysHistory

**Caminho**: `src/screens/ActivitysHistory`

**Descrição**: Histórico de atividades agendadas e realizadas.

**Tabs**:
- Agendadas
- Realizadas
- Canceladas

**Funcionalidades**:
- Ver detalhes do agendamento
- Cancelar agendamento futuro
- Filtrar por data

**Componentes**:
- `ItemListActivity`
- Filtros de data

**Navegação**:
- Para `ActivityHistoryDetail` ao clicar em item

---

### ActivityHistoryDetail

**Caminho**: `src/screens/ActivityHistoryDetail`

**Descrição**: Detalhes de um agendamento específico.

**Informações**:
- Atividade
- Data e horário
- Status (agendado/realizado/cancelado)
- Observações

**Ações**:
- Cancelar (se futuro)
- Compartilhar

---

### OtherActivitys

**Caminho**: `src/screens/OtherActivitys`

**Descrição**: Outras atividades disponíveis.

**Similar a**: `Activitys`

---

### OtherActivitiesWithoutAppointments

**Caminho**: `src/screens/OtherActivitiesWithoutAppointments`

**Descrição**: Atividades que não requerem agendamento.

**Funcionalidades**:
- Visualizar atividades sem necessidade de reserva
- Informações de funcionamento

---

## Módulo de Treinos

### TrainingHistory

**Caminho**: `src/screens/TrainingHistory`

**Descrição**: Histórico de treinos realizados.

**Funcionalidades**:
- Ver fichas de treino ativas
- Histórico de execuções
- Gráfico de progresso

**Componentes**:
- `ItemListTraining`
- Gráfico de atividades (pizza/barras)

**Navegação**:
- Para `TrainingSelect` ao clicar em ficha

---

### TrainingSelect

**Caminho**: `src/screens/TrainingSelect`

**Descrição**: Seleção e visualização de ficha de treino.

**Funcionalidades**:
- Ver exercícios da ficha
- Ordem de execução
- Repetições e séries

**Componentes**:
- `TrainingSelectButton`
- Lista de exercícios

**Navegação**:
- Para `ExerciseDetail` ao clicar em exercício

---

### ExerciseDetail

**Caminho**: `src/screens/ExerciseDetail`

**Descrição**: Detalhes de um exercício.

**Informações**:
- Nome do exercício
- Descrição/instruções
- Vídeo demonstrativo
- Repetições sugeridas

**Componentes**:
- Player de vídeo
- Texto de descrição

---

## Módulo de Centro Estético

### BeautyCenter

**Caminho**: `src/screens/BeautyCenter`

**Descrição**: Serviços do centro estético.

**Funcionalidades**:
- Listar serviços (massagem, estética, etc)
- Ver descrição dos serviços

**Navegação**:
- Para `SelectProfessional` ao selecionar serviço

---

### SelectProfessional

**Caminho**: `src/screens/SelectProfessional`

**Descrição**: Seleção de profissional.

**Funcionalidades**:
- Ver profissionais disponíveis
- Avatar e nome
- Selecionar profissional

**Componentes**:
- `AvatarProfessional`

**Navegação**:
- Para `BeautyCenterReserve` após seleção

---

### BeautyCenterReserve

**Caminho**: `src/screens/BeautyCenterReserve`

**Descrição**: Agendamento de serviço estético.

**Funcionalidades**:
- Selecionar data
- Selecionar horário
- Confirmar agendamento

**Similar a**: `ActivityReserve`

---

### BeautyCenterHistory

**Caminho**: `src/screens/BeautyCenterHistory`

**Descrição**: Histórico de agendamentos de centro estético.

**Funcionalidades**:
- Ver agendamentos futuros
- Histórico de serviços realizados
- Cancelar agendamento

**Componentes**:
- `ItemGroupReserve`

---

## Módulo de Eventos

### Events

**Caminho**: `src/screens/Events`

**Descrição**: Lista de eventos disponíveis.

**Funcionalidades**:
- Ver eventos futuros
- Filtrar por data
- Ver detalhes

**Componentes**:
- Grid/lista de eventos com imagem

**Navegação**:
- Para `EventDetail` ao clicar em evento

---

### EventDetail

**Caminho**: `src/screens/EventDetail`

**Descrição**: Detalhes do evento.

**Informações**:
- Banner do evento
- Título e subtítulo
- Data e horário
- Local
- Descrição
- Vagas disponíveis
- Valores (associado/não-associado, adulto/criança)

**Ações**:
- Inscrever-se

**Navegação**:
- Para `EventReserve` ao clicar em "Inscrever"

---

### EventReserve

**Caminho**: `src/screens/EventReserve`

**Descrição**: Inscrição em evento.

**Funcionalidades**:
- Formulário de inscrição
- Seleção de tipo (adulto/criança, associado/não-associado)
- Quantidade de pessoas
- Dados adicionais (se necessário)
- Pagamento (se não for gratuito)

**Campos variáveis**:
- Nome
- RG
- Data de nascimento
- Celular
- Matrícula

**Componentes**:
- `FormReserve` (adaptado)
- Seletor de quantidade

**Navegação**:
- Para `Payment` se requer pagamento
- Para `Events` após inscrição

---

## Módulo de Exames

### Exams

**Caminho**: `src/screens/Exams`

**Descrição**: Listagem de exames médicos.

**Funcionalidades**:
- Ver exames obrigatórios
- Status (pendente/enviado/aprovado/reprovado)
- Validade do exame

**Componentes**:
- `ExamCard`

**Navegação**:
- Para `ExamDetail` ao clicar em exame

---

### ExamDetail

**Caminho**: `src/screens/ExamDetail`

**Descrição**: Detalhes de um exame.

**Informações**:
- Tipo de exame
- Atividade relacionada
- Data de envio
- Data de validade
- Status
- Imagem/PDF do exame

**Ações**:
- Enviar exame (se pendente)
- Reenviar exame (se reprovado)

**Navegação**:
- Para `ExamAddAttachment` ao clicar em "Enviar"

---

### ExamAddAttachment

**Caminho**: `src/screens/ExamAddAttachment`

**Descrição**: Upload de exame.

**Funcionalidades**:
- Tirar foto
- Selecionar da galeria
- Upload de PDF
- Visualizar preview
- Enviar

**Componentes**:
- `Photo`
- Botões de seleção de arquivo

**Fluxo**:
1. Selecionar origem (câmera/galeria/documento)
2. Preview do arquivo
3. Confirmar envio
4. Feedback de sucesso/erro

---

### ExamActivitySelect

**Caminho**: `src/screens/ExamActivitySelect`

**Descrição**: Seleção de atividade que requer exame.

**Funcionalidades**:
- Ver quais atividades requerem o exame
- Informações sobre obrigatoriedade

---

## Módulo de Lanchonete

### SnackBar

**Caminho**: `src/screens/SnackBar`

**Descrição**: Informações da lanchonete.

**Informações**:
- Horário de funcionamento
- Contatos
- Prato do dia
- Categorias do cardápio

**Navegação**:
- Para `SnackBarItems` ao clicar em categoria
- Para `Snack` ao clicar em prato do dia

---

### SnackBarItems

**Caminho**: `src/screens/SnackBarItems`

**Descrição**: Itens do cardápio por categoria.

**Funcionalidades**:
- Ver itens da categoria
- Descrição e preço
- Imagem do prato

**Componentes**:
- `DishCard`

**Navegação**:
- Para `Snack` ao clicar em item

---

### Snack

**Caminho**: `src/screens/Snack`

**Descrição**: Detalhes de um item do cardápio.

**Informações**:
- Imagem
- Nome
- Descrição
- Preço
- Categoria

---

## Módulo de Espaços

### Reserves

**Caminho**: `src/screens/Reserves`

**Descrição**: Minhas reservas de espaços.

**Funcionalidades**:
- Ver reservas ativas
- Histórico de reservas
- Cancelar reserva

**Tabs**:
- Ativas
- Histórico

**Componentes**:
- `ItemGroupReserve`

---

### Squares

**Caminho**: `src/screens/Squares`

**Descrição**: Reserva de quadras.

**Funcionalidades**:
- Listar quadras disponíveis
- Reservar quadra

**Similar a**: Seleção de atividade + agendamento

---

### Kiosks

**Caminho**: `src/screens/Kiosks`

**Descrição**: Reserva de quiosques.

**Funcionalidades**:
- Listar quiosques disponíveis
- Reservar quiosque

---

### AgreeTermsReserves

**Caminho**: `src/screens/AgreeTermsReserves`

**Descrição**: Regras de funcionamento e termos.

**Informações**:
- Regras de uso
- Política de cancelamento
- Termos de aceite

**Componentes**:
- ScrollView com texto
- Checkbox de aceite

---

## Módulo de Perfil

### MenuProfile

**Caminho**: `src/screens/MenuProfile`

**Descrição**: Menu do perfil do usuário.

**Opções**:
- Meus dados
- Trocar senha
- Exames
- Idioma
- Pagamentos
- Configurações
- Sair

**Componentes**:
- Avatar do usuário
- Nome e e-mail
- `ItemList` para cada opção

**Navegação**:
- `Profile` → Meus dados
- `ChangePassword` → Trocar senha
- `Exams` → Exames
- `Language` → Idioma
- `Payment` → Pagamentos
- `Settings` → Configurações
- Logout → `SignIn`

---

### Profile

**Caminho**: `src/screens/Profile`

**Descrição**: Edição de dados do perfil.

**Campos**:
- Foto de perfil
- Nome
- CPF (não editável)
- E-mail
- Data de nascimento
- Celular

**Funcionalidades**:
- Editar campos
- Trocar foto de perfil
- Salvar alterações

**Componentes**:
- `Photo`
- `Input`
- `ButtonStandard`

---

### ChangePassword

**Caminho**: `src/screens/ChangePassword`

**Descrição**: Alteração de senha.

**Campos**:
- Senha atual
- Nova senha
- Confirmação de nova senha

**Validações**:
- Senha atual correta
- Nova senha mínimo 6 caracteres
- Senhas devem coincidir

**Componentes**:
- `InputPassword`
- `ButtonStandard`

---

### Settings

**Caminho**: `src/screens/Settings`

**Descrição**: Configurações do aplicativo.

**Opções**:
- Notificações
- Idioma
- Tema (se aplicável)
- Sobre
- Política de privacidade
- Termos de uso

---

### Language

**Caminho**: `src/screens/Language`

**Descrição**: Seleção de idioma.

**Opções**:
- Português
- Inglês

**Funcionalidades**:
- Trocar idioma do app
- Persistir preferência
- Atualizar no backend

**Componentes**:
- `SelectButton` para cada idioma

---

### Payment

**Caminho**: `src/screens/Payment`

**Descrição**: Histórico de pagamentos.

**Informações**:
- Pagamentos pendentes
- Histórico de pagamentos
- Detalhes de transações

---

## Padrões Comuns

### Loading States

Todas as telas que fazem requisições devem ter:

```typescript
const [loading, setLoading] = useState(true);

if (loading) {
  return <ActivityIndicator />;
}
```

### Error Handling

```typescript
const [error, setError] = useState<string | null>(null);

if (error) {
  return <ErrorView message={error} onRetry={loadData} />;
}
```

### Empty States

```typescript
if (data.length === 0) {
  return <EmptyState message="Nenhum item encontrado" />;
}
```

### Pull to Refresh

```typescript
<FlatList
  data={data}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
/>
```

---

## Próximos Passos

- [Navegação Detalhada](./NAVEGACAO.md)
- [Autenticação](./AUTENTICACAO.md)
- [Internacionalização](./I18N.md)
