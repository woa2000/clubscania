# Serviços e API

## Visão Geral

O aplicativo se comunica com um backend REST API hospedado no Azure. Todos os serviços estão localizados em `src/services/`.

---

## Configuração Base

### API Instance

**Arquivo**: `src/services/api.ts`

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://scania-clube-homolog.azurewebsites.net/api'
})

export default api;
```

### Ambientes Disponíveis

| Ambiente | URL Base |
|----------|----------|
| Desenvolvimento | `https://scania-clube-dev.azurewebsites.net/api` |
| Homologação | `https://scania-clube-homolog.azurewebsites.net/api` |
| Produção | `https://scania-clube.azurewebsites.net/api` |

⚠️ **Atenção**: Atualmente o ambiente é alterado manualmente no código. Para a nova versão, recomenda-se usar variáveis de ambiente.

### Autenticação

O token JWT é adicionado automaticamente ao header de todas as requisições após o login:

```typescript
api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

Isso é feito em `src/contexts/auth.tsx` na função `setAuthorization()`.

---

## Serviços Disponíveis

### 1. Autenticação (`auth.ts`)

**Endpoints**:

#### `singInService(username, password)`

Realiza login do usuário.

**Request**:
```typescript
POST /auth/login
{
  "userName": "string",
  "password": "string"
}
```

**Response**:
```typescript
{
  "token": "string",
  "user": {
    "id": "string",
    "nome": "string",
    "cpf": "string",
    "email": "string",
    "dataNascimento": "string",
    "celular": "string",
    "imgPerfil": "string",
    "idioma": "string"
  },
  "fileServer": "string",
  "error": null | "string"
}
```

---

### 2. Usuário (`user.ts`)

Gerenciamento de dados do usuário.

**Endpoints típicos** (inferidos):
- `GET /user/profile` - Obter dados do perfil
- `PUT /user/profile` - Atualizar perfil
- `POST /user/change-password` - Trocar senha
- `PUT /user/avatar` - Atualizar foto de perfil

---

### 3. Home (`home.ts`)

Dados da tela inicial.

**Endpoints típicos**:
- `GET /home` - Banners, atividades curtidas, promoções
- `GET /banners` - Lista de banners promocionais

**Response esperada**:
```typescript
{
  "banners": Banner[],
  "likedActivities": LikedActivity[]
}
```

---

### 4. Atividades (`activity.ts`)

Gerenciamento de atividades físicas.

**Endpoints típicos**:

#### Listar Atividades
```typescript
GET /activities
```

**Response**:
```typescript
{
  "activities": Activity[],
  "lastReservations": ActivitySchedule[]
}
```

#### Detalhes da Atividade
```typescript
GET /activities/:id
```

#### Horários Disponíveis
```typescript
GET /activities/:id/schedules?date=2025-11-10
```

**Response**:
```typescript
{
  "dates": Date[],
  "schedules": ScheduleActivity[]
}
```

#### Agendar Atividade
```typescript
POST /activities/:id/schedule
{
  "scheduleId": "string",
  "date": "string"
}
```

#### Cancelar Agendamento
```typescript
DELETE /activities/schedule/:scheduleId
```

---

### 5. Academia (`academy.ts`)

Fichas de treino e exercícios.

**Endpoints típicos**:

#### Listar Fichas de Treino
```typescript
GET /academy/trainings
```

**Response**:
```typescript
SheetTrainingProps[]
```

#### Exercícios da Ficha
```typescript
GET /academy/trainings/:id/exercises
```

**Response**:
```typescript
{
  "exercises": ExerciseProps[]
}
```

#### Detalhes do Exercício
```typescript
GET /academy/exercises/:id
```

**Response**:
```typescript
{
  "id": "string",
  "name": "string",
  "name_EN": "string",
  "description": "string",
  "description_EN": "string",
  "linkVideo": "string"
}
```

---

### 6. Centro Estético (`beautyCenter.ts`)

Agendamentos de serviços estéticos.

**Endpoints típicos**:

#### Listar Serviços
```typescript
GET /beauty-center/services
```

#### Listar Profissionais
```typescript
GET /beauty-center/professionals?serviceId=xxx
```

**Response**:
```typescript
Professional[]
```

#### Horários Disponíveis
```typescript
GET /beauty-center/schedules?serviceId=xxx&professionalId=xxx&date=2025-11-10
```

#### Agendar Serviço
```typescript
POST /beauty-center/schedule
{
  "serviceId": "string",
  "professionalId": "string",
  "scheduleId": "string",
  "date": "string"
}
```

#### Histórico de Agendamentos
```typescript
GET /beauty-center/history
```

---

### 7. Eventos (`events.ts`)

Gerenciamento de eventos do clube.

**Endpoints típicos**:

#### Listar Eventos
```typescript
GET /events
```

**Response**:
```typescript
Event[]
```

#### Detalhes do Evento
```typescript
GET /events/:id
```

**Response**:
```typescript
EventDetailProps
```

#### Inscrever-se no Evento
```typescript
POST /events/:id/register
{
  "type": number,
  "name": "string",
  "RG": "string",
  "birthDate": "string",
  "cell": "string",
  "register": "string",
  "paid": boolean
}
```

---

### 8. Exames (`exams.ts`)

Gerenciamento de exames médicos.

**Endpoints típicos**:

#### Listar Exames
```typescript
GET /exams
```

**Response**:
```typescript
ExamsProps[]
```

#### Detalhes do Exame
```typescript
GET /exams/:id
```

#### Enviar Anexo de Exame
```typescript
POST /exams/:id/attachment
FormData {
  file: File
}
```

#### Atividades que Requerem Exame
```typescript
GET /exams/required-activities
```

**Response**:
```typescript
ExamNeedActivityProps[]
```

---

### 9. Lanchonete (`snackBar.ts`)

Cardápio e pedidos.

**Endpoints típicos**:

#### Informações da Lanchonete
```typescript
GET /snack-bar/info
```

**Response**:
```typescript
SnackBarProps
```

#### Prato do Dia
```typescript
GET /snack-bar/dish-of-day
```

**Response**:
```typescript
DishOfDayProps[]
```

#### Itens do Cardápio
```typescript
GET /snack-bar/menu?category=xxx
```

**Response**:
```typescript
SnackBarItemsProps
```

#### Favoritos
```typescript
GET /snack-bar/favorites
```

**Response**:
```typescript
SnackFavoriteProps[]
```

---

### 10. Espaços (`space.ts`)

Reserva de espaços (quadras, quiosques).

**Endpoints típicos**:

#### Listar Espaços
```typescript
GET /spaces
```

#### Horários Disponíveis
```typescript
GET /spaces/:id/schedules?date=2025-11-10
```

#### Reservar Espaço
```typescript
POST /spaces/:id/reserve
{
  "scheduleId": "string",
  "date": "string"
}
```

#### Regras de Funcionamento
```typescript
GET /spaces/:id/operating-rules
```

**Response**:
```typescript
OperatingRule[]
```

#### Histórico de Reservas
```typescript
GET /spaces/reservations
```

**Response**:
```typescript
SpaceSchedule[]
```

---

### 11. Cadastro (`register.ts`)

Criação de conta e recuperação de senha.

**Endpoints típicos**:

#### Criar Conta
```typescript
POST /auth/register
{
  "nome": "string",
  "cpf": "string",
  "email": "string",
  "dataNascimento": "string",
  "celular": "string",
  "password": "string",
  "confirmPassword": "string"
}
```

#### Recuperar Senha
```typescript
POST /auth/forgot-password
{
  "email": "string"
}
```

---

## Padrão de Resposta

### Sucesso

```typescript
{
  "success": true,
  "data": { ... },
  "message": "Operação realizada com sucesso"
}
```

### Erro

```typescript
{
  "success": false,
  "error": "Mensagem de erro",
  "modelResult": {
    "success": false,
    "message": [
      {
        "property": "email",
        "message": "E-mail inválido"
      }
    ]
  }
}
```

---

## Tratamento de Erros

### Padrão Usado no App

```typescript
try {
  const response = await api.get('/endpoint');
  if (response.data.success) {
    // Sucesso
    setData(response.data);
  } else {
    // Erro de negócio
    setError(response.data.error);
  }
} catch (error) {
  // Erro de rede/servidor
  console.error(error);
  setError('Erro ao conectar com servidor');
}
```

### Recomendações para Nova Versão

1. **Interceptor de Erro Global**:

```typescript
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expirado - fazer logout
      signOut();
    }
    return Promise.reject(error);
  }
);
```

2. **Retry Logic**:

```typescript
import axiosRetry from 'axios-retry';

axiosRetry(api, { 
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay
});
```

3. **Timeout**:

```typescript
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000 // 10 segundos
});
```

---

## Upload de Arquivos

### Exemplo: Upload de Foto de Perfil

```typescript
const formData = new FormData();
formData.append('file', {
  uri: imageUri,
  type: 'image/jpeg',
  name: 'profile.jpg'
} as any);

const response = await api.post('/user/avatar', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
```

### Exemplo: Upload de Exame

```typescript
const formData = new FormData();
formData.append('file', {
  uri: documentUri,
  type: 'application/pdf',
  name: 'exam.pdf'
} as any);

const response = await api.post(`/exams/${examId}/attachment`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
```

---

## Servidor de Arquivos

Imagens e documentos são servidos de um CDN/servidor de arquivos separado.

**URL Base**: Retornada no login via `fileServer`

**Exemplo de uso**:

```typescript
const imageUrl = `${fileServer}/${user.imgPerfil}`;

<Image source={{ uri: imageUrl }} />
```

**Tipos de arquivos**:
- Fotos de perfil
- Banners promocionais
- Imagens de atividades
- Imagens de eventos
- Imagens de pratos/cardápio
- PDFs de exames

---

## Paginação

Alguns endpoints suportam paginação:

```typescript
GET /activities?page=1&limit=20
```

**Response**:
```typescript
{
  "data": Activity[],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 100,
    "itemsPerPage": 20
  }
}
```

---

## Filtros e Buscas

### Por Data

```typescript
GET /activities/schedules?date=2025-11-10
```

### Por Categoria

```typescript
GET /snack-bar/menu?category=bebidas
```

### Por Texto

```typescript
GET /activities?search=musculação
```

---

## Cache e Otimizações

### Recomendações para Nova Versão

1. **React Query**: Para cache automático de requisições

```typescript
const { data, isLoading } = useQuery('activities', fetchActivities);
```

2. **SWR**: Alternativa ao React Query

```typescript
const { data, error } = useSWR('/activities', fetcher);
```

3. **Offline First**: Usar AsyncStorage como cache

```typescript
// Salvar no cache
await AsyncStorage.setItem('activities', JSON.stringify(data));

// Ler do cache primeiro
const cached = await AsyncStorage.getItem('activities');
if (cached) {
  setActivities(JSON.parse(cached));
}
```

---

## Documentação da API

Para uma documentação completa da API backend, consulte:
- Swagger/OpenAPI (se disponível)
- Documentação interna do backend
- Postman Collection (se existir)

---

## Próximos Passos

- [Autenticação Detalhada](./AUTENTICACAO.md)
- [Guia de Telas](./PAGINAS.md)
- [Componentes](./COMPONENTES.md)
