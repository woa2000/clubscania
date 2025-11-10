# Autenticação

## Visão Geral

O sistema de autenticação usa **JWT (JSON Web Tokens)** para gerenciar sessões de usuário e **AsyncStorage** para persistência local.

---

## Fluxo de Autenticação

```
┌─────────────────────────────────────────────────┐
│                 App Inicia                      │
└───────────────────┬─────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│   AuthContext - useEffect (componentDidMount)   │
│   Verifica AsyncStorage                         │
└───────────────────┬─────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌──────────────┐      ┌──────────────────┐
│  Tem Token?  │      │  Não tem Token   │
│     SIM      │      │       NÃO        │
└──────┬───────┘      └────────┬─────────┘
       │                       │
       ▼                       ▼
┌──────────────┐      ┌──────────────────┐
│ Restaura     │      │ Vai para         │
│ Sessão       │      │ AuthRoutes       │
│ - Set User   │      │ (SignIn)         │
│ - Set Token  │      │                  │
│ - Set Header │      │                  │
└──────┬───────┘      └──────────────────┘
       │
       ▼
┌──────────────┐
│ Vai para     │
│ AppRoutes    │
│ (Home)       │
└──────────────┘
```

---

## AuthContext

**Localização**: `src/contexts/auth.tsx`

### Estado Gerenciado

```typescript
interface AuthContextData {
  signed: boolean;              // Usuário autenticado?
  user: User | null;            // Dados do usuário
  language: string;             // Idioma selecionado
  loading: boolean;             // Carregando dados?
  fileServer: string | null;    // URL do servidor de arquivos
  titleHeader: string | null;   // Título do header atual
  errorMessage: string | null;  // Mensagem de erro
  hasError: boolean | null;     // Tem erro?
  
  // Métodos
  singIn(username: string, password: string): Promise<void>;
  singOut(): Promise<void>;
  setUserEdit(user: User): void;
  setTitleHeader(title: string): void;
  setError(error: boolean, errorMessage: string | null): void;
  updateLanguage(language: string): Promise<void>;
}
```

### Inicialização

```typescript
useEffect(() => {
  async function loadStorage() {
    const storageUser = await AsyncStorage.getItem('@ClubeScania:user');
    const storageToken = await AsyncStorage.getItem('@ClubeScania:token');
    const fileServer = await AsyncStorage.getItem('@ClubeScania:fileServer');
    const language = await AsyncStorage.getItem('@ClubeScania:language');

    if (storageUser && storageToken) {
      const strToken = 'Bearer ' + storageToken;
      const strFileServer = !!fileServer ? fileServer as string : '';
      
      // Define header de autorização
      api.defaults.headers.common['Authorization'] = strToken.replace('"','').replace('"','');
      
      // Restaura estado
      setUser(JSON.parse(storageUser));
      setFileServer(strFileServer.replace('"','').replace('"',''));
      updateLanguage(JSON.parse(language ?? 'pt'));
    }
    
    setLoading(false);
  }

  loadStorage();
}, []);
```

---

## Login (singIn)

### Fluxo

```
User Input (username, password)
       │
       ▼
singIn() - AuthContext
       │
       ▼
singInService() - src/services/auth.ts
       │
       ▼
POST /api/auth/login
       │
       ├─── Sucesso ───────────┐
       │                       │
       ▼                       ▼
   Save to AsyncStorage   Set Axios Header
       │                       │
       ▼                       ▼
   Update Context State   Navigate to AppRoutes
       
       └─── Erro ─────────┐
                          │
                          ▼
                   Show Error Message
```

### Implementação

```typescript
async function singIn(username: string, password: string) {
  const response = await auth.singInService(username, password);
  
  if (!response.error) {
    // Configurar header de autenticação
    setAuthorization(response.token as string).then(() => {
      // Salvar dados localmente
      setUser(response.user);
      setFileServer(response.fileServer);
      AsyncStorage.setItem('@ClubeScania:user', JSON.stringify(response.user));
      AsyncStorage.setItem('@ClubeScania:token', JSON.stringify(response.token));
      AsyncStorage.setItem('@ClubeScania:fileServer', JSON.stringify(response.fileServer));

      // Configurar idioma
      updateLanguage(response.user?.idioma ?? 'pt');
    });
  } else {
    // Exibir erro
    setHasError(true);
    setErrorMessage(response.error);
  }
}
```

### Serviço de Login

**Arquivo**: `src/services/auth.ts`

```typescript
export function singInService(username: string, password: string): Promise<JWT> {
  const data = { 
    userName: username,
    password: password
  }
  
  return new Promise(resolve => {
    api.post("auth/login", data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      const data = response.data as JWT;
      
      resolve({
        token: data.token,
        user: {
          id: data.user?.id,
          nome: data.user?.nome,
          cpf: data.user?.cpf,
          email: data.user?.email,
          dataNascimento: data.user?.dataNascimento,
          celular: data.user?.celular,
          imgPerfil: data.user?.imgPerfil,
          idioma: data.user?.idioma,
        },
        fileServer: data.fileServer,
        error: null
      });
    })
    .catch((err) => {
      resolve({
        token: null,
        user: null,
        fileServer: null,
        error: err.response.data
      });
    });
  });
}
```

### Request

```http
POST /api/auth/login
Content-Type: application/json

{
  "userName": "12345678900",
  "password": "senha123"
}
```

### Response (Sucesso)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-123",
    "nome": "João Silva",
    "cpf": "12345678900",
    "email": "joao@email.com",
    "dataNascimento": "1990-01-01",
    "celular": "11999999999",
    "imgPerfil": "profile/123.jpg",
    "idioma": "pt"
  },
  "fileServer": "https://files.scaniaclube.com"
}
```

### Response (Erro)

```json
{
  "error": "Usuário ou senha inválidos"
}
```

---

## Logout (singOut)

### Fluxo

```
User Click Logout
       │
       ▼
singOut() - AuthContext
       │
       ▼
Remove from AsyncStorage
       │
       ▼
Clear Context State
       │
       ▼
Navigate to AuthRoutes (SignIn)
```

### Implementação

```typescript
async function singOut() {
  // Remover dados do AsyncStorage
  await AsyncStorage.removeItem('@ClubeScania:token');
  await AsyncStorage.removeItem('@ClubeScania:user');
  await AsyncStorage.removeItem('@ClubeScania:fileServer');
  
  // Limpar estado
  setUser(null);
}
```

---

## Persistência de Sessão

### AsyncStorage Keys

| Key | Conteúdo | Formato |
|-----|----------|---------|
| `@ClubeScania:token` | JWT Token | `"eyJhbGci..."` |
| `@ClubeScania:user` | Dados do usuário | `{ id, nome, cpf, ... }` |
| `@ClubeScania:fileServer` | URL do servidor de arquivos | `"https://..."` |
| `@ClubeScania:language` | Idioma selecionado | `"pt"` ou `"en"` |

### Salvar

```typescript
await AsyncStorage.setItem('@ClubeScania:token', JSON.stringify(token));
await AsyncStorage.setItem('@ClubeScania:user', JSON.stringify(user));
```

### Recuperar

```typescript
const token = await AsyncStorage.getItem('@ClubeScania:token');
const user = await AsyncStorage.getItem('@ClubeScania:user');

if (token && user) {
  const parsedUser = JSON.parse(user);
  // Restaurar sessão
}
```

### Remover

```typescript
await AsyncStorage.removeItem('@ClubeScania:token');
```

---

## Autorização de Requisições

### Header de Autorização

Todas as requisições autenticadas devem incluir o token JWT no header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Configuração no Axios

```typescript
async function setAuthorization(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
```

Isso é feito automaticamente após login em `singIn()`.

### Interceptor (Recomendado para Nova Versão)

```typescript
// src/services/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: API_URL
});

// Request Interceptor - Adiciona token automaticamente
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@ClubeScania:token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }
  
  return config;
});

// Response Interceptor - Trata erros de autenticação
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado - fazer logout
      await AsyncStorage.clear();
      // Navegar para login
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## Tela de Login

**Localização**: `src/screens/SignIn`

### Componentes

```typescript
import React, { useState } from 'react';
import { useAuth } from '../../contexts/auth';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { ButtonLogin } from '../../components/ButtonLogin';

export function SignIn() {
  const { singIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    
    try {
      await singIn(username, password);
    } catch (error) {
      // Erro já tratado no context
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Logo />
      
      <Input
        placeholder="CPF ou E-mail"
        value={username}
        onChangeText={setUsername}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <InputPassword
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
      />
      
      <ButtonLogin
        onPress={handleLogin}
        loading={loading}
      />
      
      <ForgotPasswordLink onPress={() => navigate('Forgot')} />
      
      <SignUpLink onPress={() => navigate('SignUp')} />
    </Container>
  );
}
```

---

## Cadastro (SignUp)

**Localização**: `src/screens/SignUp`

### Fluxo

```
User Fill Form
       │
       ▼
Validate Fields
       │
       ├─── Valid ─────────┐
       │                   │
       ▼                   ▼
POST /api/auth/register   Show Success Message
       │                   │
       ▼                   ▼
Navigate to SignIn   User can login
       
       └─── Invalid ──────┐
                          │
                          ▼
                   Show Error Messages
```

### Campos

```typescript
interface SignUpForm {
  nome: string;
  cpf: string;
  email: string;
  dataNascimento: string;
  celular: string;
  password: string;
  confirmPassword: string;
}
```

### Validações

```typescript
const schema = yup.object({
  nome: yup.string().required('Nome obrigatório'),
  cpf: yup.string()
    .required('CPF obrigatório')
    .test('cpf-valid', 'CPF inválido', validateCPF),
  email: yup.string()
    .required('E-mail obrigatório')
    .email('E-mail inválido'),
  dataNascimento: yup.date()
    .required('Data de nascimento obrigatória')
    .max(new Date(), 'Data inválida'),
  celular: yup.string()
    .required('Celular obrigatório')
    .min(10, 'Celular inválido'),
  password: yup.string()
    .required('Senha obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Senhas não conferem')
});
```

---

## Recuperação de Senha

**Localização**: `src/screens/ForgotPassword`

### Fluxo

```
User Enter Email
       │
       ▼
POST /api/auth/forgot-password
       │
       ├─── Sucesso ──────┐
       │                  │
       ▼                  ▼
E-mail enviado    Show Success Message
com link          │
                  ▼
            Navigate to SignIn
       
       └─── Erro ─────────┐
                          │
                          ▼
                   Show Error Message
```

### Request

```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@email.com"
}
```

---

## Atualização de Perfil

### Editar Usuário

```typescript
function setUserEdit(user: User) {
  try {
    setUser(user);
    AsyncStorage.setItem('@ClubeScania:user', JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
}
```

**Uso**:

```typescript
const { user, setUserEdit } = useAuth();

const handleUpdateProfile = async () => {
  const response = await api.put('/user/profile', updatedData);
  
  if (response.data.success) {
    setUserEdit(response.data.user);
  }
};
```

---

## Segurança

### Boas Práticas Implementadas

✅ Token JWT salvo em AsyncStorage (criptografado no dispositivo)  
✅ Senha não é salva localmente  
✅ HTTPS para comunicação com backend  
✅ Token enviado apenas no header (não na URL)

### Recomendações para Nova Versão

1. **Refresh Token**: Implementar sistema de refresh token

```typescript
{
  "accessToken": "short-lived-token",
  "refreshToken": "long-lived-token"
}
```

2. **Expiração de Token**: Validar expiração e renovar automaticamente

```typescript
const isTokenExpired = (token: string) => {
  const decoded = jwtDecode(token);
  return decoded.exp < Date.now() / 1000;
};
```

3. **Biometria**: Adicionar autenticação biométrica

```bash
npm install expo-local-authentication
```

```typescript
import * as LocalAuthentication from 'expo-local-authentication';

const authenticate = async () => {
  const result = await LocalAuthentication.authenticateAsync();
  if (result.success) {
    // Fazer login automaticamente
  }
};
```

4. **Keychain/Keystore**: Usar armazenamento seguro

```bash
npm install expo-secure-store
```

```typescript
import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('token', token);
const token = await SecureStore.getItemAsync('token');
```

---

## Tratamento de Erros

### Erros Comuns

| Erro | Causa | Tratamento |
|------|-------|------------|
| 401 Unauthorized | Token inválido/expirado | Fazer logout e redirecionar para login |
| 400 Bad Request | Dados inválidos | Exibir mensagens de validação |
| 404 Not Found | Usuário não encontrado | Exibir erro "Usuário não cadastrado" |
| 500 Server Error | Erro no backend | Exibir "Erro no servidor. Tente novamente" |
| Network Error | Sem conexão | Exibir "Sem conexão com a internet" |

### Implementação

```typescript
try {
  await singIn(username, password);
} catch (error) {
  if (error.response) {
    // Erro da API
    switch (error.response.status) {
      case 401:
        setError(true, 'Usuário ou senha inválidos');
        break;
      case 500:
        setError(true, 'Erro no servidor. Tente novamente');
        break;
      default:
        setError(true, 'Erro desconhecido');
    }
  } else if (error.request) {
    // Erro de rede
    setError(true, 'Sem conexão com a internet');
  } else {
    setError(true, 'Erro ao fazer login');
  }
}
```

---

## Próximos Passos

- [Internacionalização](./I18N.md)
- [Navegação](./NAVEGACAO.md)
- [Build e Deploy](./BUILD-DEPLOY.md)
