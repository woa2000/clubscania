# Navegação

## Visão Geral

O aplicativo usa **React Navigation v6** com uma combinação de Stack Navigator e Tab Navigator.

---

## Estrutura de Navegação

```
App.tsx
└── NavigationContainer
    └── Routes (src/routes/index.tsx)
        ├── AuthRoutes (não autenticado)
        │   └── Stack Navigator
        │       ├── SignIn
        │       ├── SignUp
        │       └── ForgotPassword
        │
        └── AppRoutes (autenticado)
            └── Stack Navigator
                ├── HomeTabs (Tab Navigator)
                │   ├── Home
                │   ├── Atividades (ActivitysHistory)
                │   ├── Centro Estético (BeautyCenterHistory)
                │   ├── Espaços (Reserves)
                │   └── Perfil (MenuProfile)
                │
                └── Outras Screens (Stack)
                    ├── Settings
                    ├── Profile
                    ├── ChangePassword
                    ├── Activitys
                    ├── ActivityDetail
                    ├── ActivityReserve
                    ├── BeautyCenter
                    ├── SelectProfessional
                    ├── BeautyCenterReserve
                    ├── Events
                    ├── EventDetail
                    ├── EventReserve
                    ├── Exams
                    ├── ExamDetail
                    ├── ExamAddAttachment
                    ├── TrainingHistory
                    ├── ExerciseDetail
                    ├── SnackBar
                    ├── SnackBarItems
                    ├── Snack
                    ├── Squares
                    ├── Kiosks
                    ├── Payment
                    ├── Language
                    ├── AgreeTermsReserves
                    ├── OtherActivitys
                    └── OtherActivitiesWithoutAppointments
```

---

## Routes Principal

**Arquivo**: `src/routes/index.tsx`

```typescript
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/auth';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

export function Routes() {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  } 

  return signed ? <AppRoutes /> : <AuthRoutes />;
}
```

**Lógica**:
1. Verifica se está carregando dados do AsyncStorage
2. Se carregando, mostra loading
3. Se `signed: true`, mostra `AppRoutes`
4. Se `signed: false`, mostra `AuthRoutes`

---

## Auth Routes

**Arquivo**: `src/routes/auth.routes.tsx`

```typescript
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { ForgotPassword } from '../screens/ForgotPassword';

const Stack = createStackNavigator();

export function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Forgot" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
```

**Características**:
- Stack Navigator
- Sem header (headerShown: false)
- Tela inicial: SignIn

---

## App Routes

**Arquivo**: `src/routes/app.routes.tsx`

### Tab Navigator (HomeTabs)

```typescript
function HomeTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#D97D54',
        tabBarStyle: {
          position: 'absolute',
          paddingTop: 15,
          paddingBottom: 15,
          height: 70
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" color={color} size={size} />
          )
        }}
      />
      
      <Tab.Screen
        name={t("Atividades")}
        component={ActivitysHistory}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="activity" color={color} size={size} />
          ),
          headerShown: true,
          header: () => <Header title={t("Atividades")} showBack={true} />
        }}
      />
      
      <Tab.Screen
        name={t("Centro Estético")}
        component={BeautyCenterHistory}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="users" color={color} size={size} />
          )
        }}
      />
      
      <Tab.Screen
        name={t("Espaços")}
        component={Reserves}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="book-open" color={color} size={size} />
          )
        }}
      />

      <Tab.Screen
        name={t("Perfil")}
        component={MenuProfile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
          headerShown: true,
          header: () => <Header title={t("Perfil")} showBack={true} showConfig={false} />
        }}
      />
    </Tab.Navigator>
  );
}
```

**Configuração**:
- **Cor ativa**: #D97D54 (laranja)
- **Altura**: 70px
- **Posição**: Absolute (bottom)
- **Padding**: 15px top/bottom

**Tabs**:
1. Home - Ícone: home
2. Atividades - Ícone: activity
3. Centro Estético - Ícone: users
4. Espaços - Ícone: book-open
5. Perfil - Ícone: user

### Stack Navigator

```typescript
export function AppRoutes() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeTabs} />
      
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: true,
          header: () => <Header title={t("Configurações")} showBack={true} />
        }}
      />
      
      <Stack.Screen name="Activitys" component={Activitys} />
      <Stack.Screen name="ActivityDetail" component={ActivityDetail} />
      
      {/* ... mais screens */}
    </Stack.Navigator>
  );
}
```

**Padrão**:
- `headerShown: false` por padrão
- Headers customizados usando componente `Header`
- Algumas telas sem header (navegação manual)

---

## Navegação Programática

### Usando useNavigation

```typescript
import { useNavigation } from '@react-navigation/native';

function MyComponent() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ActivityDetail', { id: '123' });
  };

  return <Button onPress={handlePress} />;
}
```

### Navegação com Parâmetros

```typescript
// Enviando parâmetros
navigation.navigate('EventDetail', {
  id: event.id,
  title: event.title
});

// Recebendo parâmetros
import { useRoute } from '@react-navigation/native';

const route = useRoute();
const { id, title } = route.params;
```

### Voltar

```typescript
navigation.goBack();
```

### Resetar Stack

```typescript
navigation.reset({
  index: 0,
  routes: [{ name: 'Home' }],
});
```

### Navigate vs Push

```typescript
// Navigate: vai para tela ou volta se já estiver no stack
navigation.navigate('Profile');

// Push: sempre adiciona nova instância no stack
navigation.push('Profile');
```

---

## Tipagem de Navegação (TypeScript)

### Criar tipos de rotas

```typescript
// src/routes/types.ts
export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Forgot: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Settings: undefined;
  Activitys: { type?: string };
  ActivityDetail: { 
    id: string; 
    title: string;
    type?: string;
  };
  EventDetail: { 
    id: string;
  };
  EventReserve: {
    id: string;
    title: string;
  };
  // ... outras rotas
};
```

### Usar tipos

```typescript
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../routes/types';

type NavigationProps = NavigationProp<AppStackParamList>;

function MyComponent() {
  const navigation = useNavigation<NavigationProps>();

  const handlePress = () => {
    navigation.navigate('ActivityDetail', {
      id: '123',
      title: 'Musculação'
    });
  };
}
```

---

## Headers Customizados

### Componente Header

**Localização**: `src/components/Header`

```typescript
interface Props {
  title: string;
  showBack?: boolean;
  showConfig?: boolean;
  onBackPress?: () => void;
}

export function Header({ 
  title, 
  showBack = false, 
  showConfig = true,
  onBackPress 
}: Props) {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <Container>
      {showBack && <ButtonBack onPress={handleBack} />}
      <Title>{title}</Title>
      {showConfig && <ConfigIcon />}
    </Container>
  );
}
```

### Uso em Screen Options

```typescript
<Stack.Screen
  name="Profile"
  component={Profile}
  options={{
    headerShown: true,
    header: () => <Header title="Meus Dados" showBack={true} />
  }}
/>
```

---

## Deep Links (Configuração Futura)

Para habilitar deep links:

### app.json

```json
{
  "expo": {
    "scheme": "scaniaclube",
    "ios": {
      "associatedDomains": ["applinks:scaniaclube.com"]
    },
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "data": {
            "scheme": "scaniaclube"
          }
        }
      ]
    }
  }
}
```

### Linking Configuration

```typescript
const linking = {
  prefixes: ['scaniaclube://', 'https://scaniaclube.com'],
  config: {
    screens: {
      Home: 'home',
      ActivityDetail: 'activity/:id',
      EventDetail: 'event/:id',
    }
  }
};

<NavigationContainer linking={linking}>
  <Routes />
</NavigationContainer>
```

**Exemplos de URLs**:
- `scaniaclube://activity/123`
- `https://scaniaclube.com/event/456`

---

## Transições e Animações

### Customizar transição

```typescript
<Stack.Navigator
  screenOptions={{
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  }}
>
```

### Opções de transição:
- `forHorizontalIOS` - Slide horizontal (iOS style)
- `forVerticalIOS` - Slide vertical (modal)
- `forFadeFromBottomAndroid` - Fade (Android)
- `forRevealFromBottomAndroid` - Reveal from bottom

---

## Interceptar Navegação

### Prevenir navegação

```typescript
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

function EditProfile() {
  const navigation = useNavigation();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!hasUnsavedChanges) {
        return;
      }

      e.preventDefault();

      Alert.alert(
        'Descartar mudanças?',
        'Você tem mudanças não salvas. Deseja descartá-las?',
        [
          { text: "Não", style: 'cancel' },
          {
            text: 'Sim',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });

    return unsubscribe;
  }, [navigation, hasUnsavedChanges]);
}
```

---

## Navegação Condicional

### Baseada em Autenticação

Já implementado em `src/routes/index.tsx`:

```typescript
return signed ? <AppRoutes /> : <AuthRoutes />;
```

### Baseada em Verificação de Exames

```typescript
const handleNavigateToActivity = () => {
  if (activity.needsExam && !user.hasValidExam) {
    navigation.navigate('ExamActivitySelect', { activityId: activity.id });
  } else {
    navigation.navigate('ActivityReserve', { activityId: activity.id });
  }
};
```

### Baseada em Termos Aceitos

```typescript
const handleReserve = () => {
  if (!hasAcceptedTerms) {
    navigation.navigate('AgreeTermsReserves', { 
      returnScreen: 'Reserve',
      spaceId: space.id 
    });
  } else {
    // Continuar com reserva
  }
};
```

---

## Bottom Tabs Customizados

### Badge em Tab

```typescript
<Tab.Screen
  name="Perfil"
  component={MenuProfile}
  options={{
    tabBarBadge: 3, // Número de notificações
    tabBarIcon: ({ color, size }) => (
      <AntDesign name="user" color={color} size={size} />
    )
  }}
/>
```

### Ocultar Tab em Certas Telas

```typescript
<Stack.Screen
  name="ActivityDetail"
  component={ActivityDetail}
  options={{
    tabBarStyle: { display: 'none' }
  }}
/>
```

---

## Fluxos de Navegação Comuns

### Fluxo de Agendamento de Atividade

```
Home
  → Activitys (lista)
    → ActivityDetail (detalhes)
      → ActivityReserve (agendar)
        → [Sucesso] ActivitysHistory
        → [Erro] Alert + permanecer em ActivityReserve
```

### Fluxo de Inscrição em Evento

```
Home
  → Events (lista)
    → EventDetail (detalhes)
      → EventReserve (formulário)
        → [Com pagamento] Payment
          → [Sucesso] Events
        → [Sem pagamento] Events
```

### Fluxo de Upload de Exame

```
MenuProfile
  → Exams (lista)
    → ExamDetail (detalhes)
      → ExamAddAttachment (upload)
        → [Sucesso] ExamDetail
        → [Erro] Alert + permanecer em ExamAddAttachment
```

---

## Boas Práticas

### 1. Sempre use useNavigation dentro de componentes

```typescript
// ✅ Correto
function Component() {
  const navigation = useNavigation();
  return <Button onPress={() => navigation.navigate('Home')} />;
}

// ❌ Errado
function Component({ navigation }) {
  return <Button onPress={() => navigation.navigate('Home')} />;
}
```

### 2. Tipar parâmetros

```typescript
type RouteParams = {
  id: string;
  title: string;
};

const route = useRoute<RouteProp<ParamList, 'Screen'>>();
const { id, title } = route.params;
```

### 3. Limpar listeners

```typescript
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    // Executar ao focar tela
  });

  return unsubscribe; // Limpar ao desmontar
}, [navigation]);
```

### 4. Usar useFocusEffect para ações ao focar

```typescript
import { useFocusEffect } from '@react-navigation/native';

useFocusEffect(
  useCallback(() => {
    loadData();
  }, [])
);
```

---

## Próximos Passos

- [Autenticação](./AUTENTICACAO.md)
- [Internacionalização](./I18N.md)
- [Build e Deploy](./BUILD-DEPLOY.md)
