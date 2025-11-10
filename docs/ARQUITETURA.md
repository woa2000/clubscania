# Arquitetura do Aplicativo

## Visão Geral

O **Scania Clube App** segue uma arquitetura baseada em componentes com gerenciamento de estado via Context API e comunicação com backend via REST API.

```
┌─────────────────────────────────────────────────┐
│                   App.tsx                       │
│          (Componente Raiz + Providers)          │
└─────────────┬───────────────────────────────────┘
              │
              ├──> NavigationContainer
              │
┌─────────────▼───────────────────────────────────┐
│              AuthProvider                       │
│         (Context de Autenticação)               │
└─────────────┬───────────────────────────────────┘
              │
              ├──> Routes (Gerenciador de Rotas)
              │    │
              │    ├──> AuthRoutes (não autenticado)
              │    │    ├── SignIn
              │    │    ├── SignUp
              │    │    └── ForgotPassword
              │    │
              │    └──> AppRoutes (autenticado)
              │         ├── HomeTabs (Tab Navigator)
              │         │   ├── Home
              │         │   ├── Atividades
              │         │   ├── Centro Estético
              │         │   ├── Espaços
              │         │   └── Perfil
              │         │
              │         └── Stack Screens
              │             ├── Settings
              │             ├── Profile
              │             ├── Events
              │             └── ... (30+ telas)
              │
              └──> Serviços API (Axios)
                   ├── auth.ts
                   ├── user.ts
                   ├── activity.ts
                   └── ... (outros serviços)
```

---

## Camadas da Aplicação

### 1. Camada de Apresentação (UI)

**Responsabilidades**:
- Renderização de componentes visuais
- Interação com o usuário
- Navegação entre telas

**Tecnologias**:
- React Native
- Styled Components
- React Navigation

**Estrutura**:
```
src/
├── components/     # Componentes reutilizáveis
└── screens/        # Telas completas
```

### 2. Camada de Lógica de Negócio

**Responsabilidades**:
- Gerenciamento de estado
- Validação de dados
- Regras de negócio

**Tecnologias**:
- React Context API
- React Hooks
- Formik/Yup (validação)

**Estrutura**:
```
src/
├── contexts/       # Contextos globais
└── utils/          # Funções auxiliares
```

### 3. Camada de Dados

**Responsabilidades**:
- Comunicação com API
- Persistência local
- Cache de dados

**Tecnologias**:
- Axios (HTTP)
- AsyncStorage (persistência)

**Estrutura**:
```
src/
├── services/       # Serviços de API
└── interfaces/     # Tipagem de dados
```

---

## Fluxo de Dados

### Autenticação

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ SignIn   │────>│ singIn() │────>│ API POST │────>│ Response │
│ Screen   │     │ Context  │     │ /login   │     │ JWT      │
└──────────┘     └──────────┘     └──────────┘     └────┬─────┘
                                                         │
                      ┌──────────────────────────────────┘
                      │
                      ▼
              ┌───────────────┐
              │ AsyncStorage  │
              │ - Save Token  │
              │ - Save User   │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │ Set Axios     │
              │ Authorization │
              │ Header        │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │ Update State  │
              │ signed: true  │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │ Navigate to   │
              │ AppRoutes     │
              └───────────────┘
```

### Requisição de Dados

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Screen   │────>│ useEffect│────>│ Service  │────>│ API GET  │
│          │     │          │     │ Function │     │          │
└──────────┘     └──────────┘     └──────────┘     └────┬─────┘
     ▲                                                    │
     │                                                    │
     │           ┌──────────────────────────────────────┘
     │           │
     │           ▼
     │    ┌──────────┐     ┌──────────┐
     └────│ setState │<────│ Response │
          │          │     │ Data     │
          └──────────┘     └──────────┘
```

### Navegação

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│ User     │────>│ Button   │────>│ navigate │
│ Action   │     │ Press    │     │ (screen) │
└──────────┘     └──────────┘     └────┬─────┘
                                        │
                                        ▼
                                 ┌──────────┐
                                 │ Stack/   │
                                 │ Tab Nav  │
                                 └────┬─────┘
                                      │
                                      ▼
                                 ┌──────────┐
                                 │ New      │
                                 │ Screen   │
                                 └──────────┘
```

---

## Gerenciamento de Estado

### Context API - AuthContext

**Localização**: `src/contexts/auth.tsx`

**Estado gerenciado**:

```typescript
interface AuthContextData {
  signed: boolean;              // Usuário está autenticado?
  user: User | null;            // Dados do usuário
  language: string;             // Idioma selecionado
  loading: boolean;             // Carregando dados?
  fileServer: string | null;    // URL do servidor de arquivos
  titleHeader: string | null;   // Título do header
  errorMessage: string | null;  // Mensagem de erro
  hasError: boolean | null;     // Tem erro?
  
  // Funções
  singIn(username: string, password: string): Promise<void>;
  singOut(): Promise<void>;
  setUserEdit(user: User): void;
  setTitleHeader(title: string): void;
  setError(error: boolean, errorMessage: string | null): void;
  updateLanguage(language: string): Promise<void>;
}
```

**Fluxo de autenticação**:

1. **Login**:
   - Usuário insere credenciais
   - `singIn()` chama `auth.singInService()`
   - API retorna JWT token + dados do usuário
   - Salva em AsyncStorage
   - Atualiza header do Axios
   - Atualiza estado `signed: true`
   - Redireciona para AppRoutes

2. **Logout**:
   - `singOut()` remove dados do AsyncStorage
   - Limpa estado do usuário
   - `signed: false`
   - Redireciona para AuthRoutes

3. **Persistência**:
   - Ao iniciar o app, verifica AsyncStorage
   - Se existe token, restaura sessão
   - Se não, mantém em tela de login

### Estado Local (useState)

Usado dentro de componentes/telas para:
- Controle de formulários
- Loading states
- Modais
- Listas dinâmicas

Exemplo:
```typescript
const [activities, setActivities] = useState<Activity[]>([]);
const [loading, setLoading] = useState(true);
const [selectedDate, setSelectedDate] = useState(new Date());
```

---

## Comunicação com Backend

### Configuração Base

**Arquivo**: `src/services/api.ts`

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://scania-clube-homolog.azurewebsites.net/api'
})

export default api;
```

### Interceptors

O token JWT é adicionado ao header em `src/contexts/auth.tsx`:

```typescript
api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

### Padrão de Serviços

Cada serviço retorna uma Promise:

```typescript
// src/services/auth.ts
export function singInService(username: string, password: string): Promise<JWT> {
  const data = { 
    userName: username,
    password: password
  }
  
  return new Promise(resolve => {
    api.post("auth/login", data, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      resolve({
        token: response.data.token,
        user: response.data.user,
        fileServer: response.data.fileServer,
        error: null
      }) 
    })
    .catch((err) => {
      resolve({
        token: null,
        user: null,
        fileServer: null,
        error: err.response.data
      })
    });
  })      
}
```

**Uso em componentes**:

```typescript
const response = await activity.getActivities();
if (!response.error) {
  setActivities(response.activities);
} else {
  // Tratar erro
}
```

---

## Navegação

### Estrutura

O app usa **React Navigation v6** com duas estratégias:

1. **Stack Navigator**: Navegação empilhada (com botão voltar)
2. **Tab Navigator**: Navegação por abas (bottom tabs)

### Hierarquia

```
NavigationContainer
└── Routes (src/routes/index.tsx)
    ├── AuthRoutes (Stack)
    │   ├── SignIn
    │   ├── SignUp
    │   └── ForgotPassword
    │
    └── AppRoutes (Stack)
        ├── HomeTabs (Tab Navigator)
        │   ├── Home
        │   ├── Atividades
        │   ├── Centro Estético
        │   ├── Espaços
        │   └── Perfil
        │
        └── Outras Screens (Stack)
            ├── Settings
            ├── Profile
            ├── Events
            └── ... (30+ telas)
```

### Navegação Programática

```typescript
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

// Navegar para outra tela
navigation.navigate('ActivityDetail', { id: '123' });

// Voltar
navigation.goBack();

// Resetar stack
navigation.reset({
  index: 0,
  routes: [{ name: 'Home' }],
});
```

### Passagem de Parâmetros

```typescript
// Enviando
navigation.navigate('EventDetail', { 
  id: event.id,
  title: event.title 
});

// Recebendo
import { useRoute } from '@react-navigation/native';

const route = useRoute();
const { id, title } = route.params;
```

---

## Internacionalização (i18n)

### Configuração

**Arquivo**: `src/languages/i18n.js`

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './portuguese.json';
import en from './english.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en }
    },
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
```

### Uso em Componentes

```typescript
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();

// Traduzir texto
<Text>{t("Bem-vindo")}</Text>

// Mudar idioma
i18n.changeLanguage('en');
```

### Persistência

O idioma é salvo em:
- AsyncStorage (`@ClubeScania:language`)
- Estado do AuthContext
- Sincronizado com preferência do usuário no backend

---

## Fluxo de Dados Completo (Exemplo: Listar Atividades)

```
1. Usuário acessa tela "Atividades"
   │
   ▼
2. useEffect() executa ao montar componente
   │
   ▼
3. Chama activity.getActivities()
   │
   ▼
4. Serviço faz GET /api/activities
   │
   ▼
5. Backend retorna JSON com lista de atividades
   │
   ▼
6. Serviço retorna dados para componente
   │
   ▼
7. setState(activities) atualiza estado local
   │
   ▼
8. React re-renderiza componente
   │
   ▼
9. FlatList exibe lista de atividades
   │
   ▼
10. Usuário clica em uma atividade
    │
    ▼
11. navigation.navigate('ActivityDetail', { id })
    │
    ▼
12. Nova tela carrega detalhes da atividade
```

---

## Padrões de Design

### Container/Presentational Pattern

Muitos componentes seguem o padrão:

```typescript
// Container (lógica)
function ActivityListContainer() {
  const [activities, setActivities] = useState([]);
  
  useEffect(() => {
    loadActivities();
  }, []);
  
  return <ActivityList activities={activities} />;
}

// Presentational (UI)
function ActivityList({ activities }: Props) {
  return (
    <FlatList
      data={activities}
      renderItem={({ item }) => <ActivityCard activity={item} />}
    />
  );
}
```

### Composition Pattern

Componentes são compostos de outros menores:

```typescript
function Home() {
  return (
    <Container>
      <Header title="Home" />
      <BannerPromotion banners={banners} />
      <Category categories={categories} />
      <ActivityList activities={activities} />
    </Container>
  );
}
```

### Custom Hooks

Embora não esteja explicitamente implementado no código atual, é recomendado criar custom hooks para:
- Fetch de dados
- Validações
- Lógica reutilizável

---

## Próximos Passos

- [Componentes Detalhados](./COMPONENTES.md)
- [Documentação de Serviços](./SERVICOS.md)
- [Guia de Telas](./PAGINAS.md)
