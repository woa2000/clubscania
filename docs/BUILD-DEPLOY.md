# Build e Deploy

## Visão Geral

Este guia cobre o processo de build e publicação do **Scania Clube App** nas lojas Apple App Store e Google Play Store.

---

## Informações Importantes

### Versioning

**Versão Atual**: `1.1.4`

**Sistema de Versionamento**:
- iOS: `CFBundleShortVersionString` = `1.1.4`
- Android: `versionName` = `1.1.2` (desatualizado no build.gradle)
- Android: `versionCode` = `14`

⚠️ **Importante**: Ao criar a nova versão, sincronize os números de versão entre iOS e Android.

### Identificadores

- **iOS Bundle Identifier**: `com.rasystem.appclubescania`
- **Android Package Name**: `com.rasystem.appclubescania`

⚠️ **Atenção**: Como a nova versão será uma continuação da versão publicada, **mantenha esses identificadores** para que seja uma atualização e não um app novo.

---

## Build com Expo (EAS Build)

O projeto usa **EAS Build** (Expo Application Services) para builds de produção.

### Configuração (eas.json)

```json
{
  "cli": {
    "version": ">= 0.47.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

### Pré-requisitos

1. **Instalar EAS CLI**:
```bash
npm install -g eas-cli
```

2. **Login na conta Expo**:
```bash
eas login
```

3. **Configurar projeto**:
```bash
eas build:configure
```

---

## Build para iOS

### Pré-requisitos iOS

- **Apple Developer Account** (pago)
- **Certificados e Provisioning Profiles**
- **App Store Connect** configurado

### Passos

#### 1. Atualizar Versão

**Arquivo**: `app.json`

```json
{
  "expo": {
    "version": "1.2.0",  // Incrementar
    "ios": {
      "bundleIdentifier": "com.rasystem.appclubescania"
    }
  }
}
```

**Arquivo**: `ios/ScaniaClube/Info.plist`

```xml
<key>CFBundleShortVersionString</key>
<string>1.2.0</string>  <!-- Incrementar -->
<key>CFBundleVersion</key>
<string>1</string>  <!-- Incrementar se necessário -->
```

#### 2. Build de Preview

```bash
eas build --platform ios --profile preview
```

#### 3. Build de Produção

```bash
eas build --platform ios --profile production
```

#### 4. Submit para App Store

```bash
eas submit --platform ios
```

Ou manualmente via **Transporter** ou **App Store Connect**.

### Checklist iOS

- [ ] Versão incrementada
- [ ] Screenshots atualizadas
- [ ] Descrição na App Store atualizada
- [ ] Privacy Policy URL configurada
- [ ] Permissões (Info.plist) justificadas
- [ ] TestFlight testado
- [ ] Compliance de exportação preenchida

---

## Build para Android

### Pré-requisitos Android

- **Google Play Console** configurado
- **Keystore** (signing key)

### Passos

#### 1. Atualizar Versão

**Arquivo**: `app.json`

```json
{
  "expo": {
    "version": "1.2.0",  // Incrementar
    "android": {
      "package": "com.rasystem.appclubescania",
      "versionCode": 15  // Incrementar (sempre maior que anterior)
    }
  }
}
```

**Arquivo**: `android/app/build.gradle`

```gradle
defaultConfig {
    applicationId 'com.rasystem.appclubescania'
    versionCode 15  // Incrementar
    versionName "1.2.0"  // Incrementar
}
```

#### 2. Build de Preview (APK)

```bash
eas build --platform android --profile preview
```

Isso gera um APK para testes internos.

#### 3. Build de Produção (AAB)

```bash
eas build --platform android --profile production
```

Isso gera um Android App Bundle (.aab) para publicação.

#### 4. Submit para Google Play

```bash
eas submit --platform android
```

Ou manualmente via **Google Play Console**.

### Checklist Android

- [ ] `versionCode` incrementado
- [ ] `versionName` incrementado
- [ ] Screenshots atualizadas
- [ ] Descrição na Play Store atualizada
- [ ] Privacy Policy URL configurada
- [ ] Permissões justificadas
- [ ] Testado em diferentes tamanhos de tela
- [ ] Internal Testing track testado

---

## Assinatura de Apps

### iOS

EAS gerencia automaticamente certificados e provisioning profiles.

Para gerenciar manualmente:

```bash
eas credentials
```

### Android

#### Gerar Keystore (primeira vez)

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore scania-clube.keystore -alias scania-clube -keyalg RSA -keysize 2048 -validity 10000
```

#### Configurar no EAS

```bash
eas credentials
```

Ou adicionar em `eas.json`:

```json
{
  "build": {
    "production": {
      "android": {
        "credentialsSource": "local"
      }
    }
  }
}
```

E criar `credentials.json`:

```json
{
  "android": {
    "keystore": {
      "keystorePath": "./scania-clube.keystore",
      "keystorePassword": "****",
      "keyAlias": "scania-clube",
      "keyPassword": "****"
    }
  }
}
```

⚠️ **Nunca commite** o keystore ou senhas no Git!

---

## Ambiente de Produção

### Trocar para API de Produção

**Arquivo**: `src/services/api.ts`

```typescript
// Comentar homologação
// const api = axios.create({
//   baseURL: 'https://scania-clube-homolog.azurewebsites.net/api'
// })

// Descomentar produção
const api = axios.create({
  baseURL: 'https://scania-clube.azurewebsites.net/api'
})
```

### Recomendação: Usar Variáveis de Ambiente

1. Instalar:
```bash
npm install react-native-dotenv
npm install --save-dev @types/react-native-dotenv
```

2. Criar arquivos:

**.env.production**:
```
API_URL=https://scania-clube.azurewebsites.net/api
```

**.env.staging**:
```
API_URL=https://scania-clube-homolog.azurewebsites.net/api
```

3. Usar no código:
```typescript
import { API_URL } from '@env';

const api = axios.create({
  baseURL: API_URL
});
```

4. Configurar build:
```bash
ENVIRONMENT=production eas build --platform ios
```

---

## Testes Antes de Publicar

### Checklist de Testes

#### Funcionalidades Críticas
- [ ] Login/Logout
- [ ] Cadastro de usuário
- [ ] Recuperação de senha
- [ ] Agendamento de atividades
- [ ] Agendamento centro estético
- [ ] Reserva de espaços
- [ ] Inscrição em eventos
- [ ] Upload de exames
- [ ] Visualização de cardápio
- [ ] Troca de idioma
- [ ] Edição de perfil
- [ ] Troca de senha

#### Navegação
- [ ] Todas as telas acessíveis
- [ ] Botão voltar funciona
- [ ] Tabs funcionam
- [ ] Deep links (se aplicável)

#### UI/UX
- [ ] Splash screen exibida
- [ ] Ícone correto
- [ ] Fontes carregam corretamente
- [ ] Imagens carregam
- [ ] Loading states funcionam
- [ ] Mensagens de erro claras

#### Performance
- [ ] App abre em < 3 segundos
- [ ] Navegação fluida
- [ ] Listas com scroll suave
- [ ] Imagens otimizadas

#### Offline
- [ ] Comportamento sem internet
- [ ] Mensagens de erro adequadas

---

## Publicação na App Store (iOS)

### Processo

1. **Build com EAS**:
```bash
eas build --platform ios --profile production
```

2. **Upload automático** ou manual via **Transporter**

3. **App Store Connect**:
   - Selecionar build
   - Preencher informações:
     - Screenshots (6.5", 6.7", 5.5")
     - Descrição
     - Keywords
     - Support URL
     - Privacy Policy URL
   - Selecionar categoria
   - Definir preço (gratuito)
   - Configurar disponibilidade

4. **Submit for Review**

5. **Aguardar aprovação** (1-3 dias)

### Informações Necessárias

- **Nome do App**: Scania Clube
- **Categoria**: Lifestyle / Health & Fitness
- **Privacy Policy**: URL obrigatória
- **Support URL**: Contato de suporte
- **Descrição**: Português e Inglês

---

## Publicação na Play Store (Android)

### Processo

1. **Build com EAS**:
```bash
eas build --platform android --profile production
```

2. **Google Play Console**:
   - Criar novo release em "Production"
   - Upload do .aab
   - Preencher release notes
   - Screenshots:
     - Phone (16:9)
     - Tablet 7" (16:9)
     - Tablet 10" (16:9)
   - Descrição curta e longa
   - Ícone e banner

3. **Classificação de conteúdo**

4. **Política de privacidade**

5. **Revisar e publicar**

6. **Aguardar aprovação** (algumas horas a dias)

### Faixas de Lançamento

- **Internal Testing**: Testes internos
- **Closed Testing**: Beta testers
- **Open Testing**: Beta público
- **Production**: Lançamento público

---

## Atualizações (Over-The-Air)

### Expo Updates

Para pequenas atualizações sem rebuild:

```bash
eas update --branch production --message "Correção de bugs"
```

**Limitações**:
- Apenas código JavaScript
- Não funciona para mudanças nativas
- Requer configuração no `app.json`

---

## Rollback

### iOS

1. App Store Connect > Versões do App
2. Selecionar versão anterior
3. Submit novamente

### Android

1. Play Console > Gestão de lançamentos
2. Promover versão anterior
3. Publicar

---

## Monitoramento Pós-Publicação

### Ferramentas Recomendadas

1. **Sentry** - Monitoramento de erros
2. **Firebase Crashlytics** - Crash reports
3. **Google Analytics** - Métricas de uso
4. **App Store Connect Analytics** - iOS
5. **Google Play Console Statistics** - Android

### KPIs para Monitorar

- Taxa de crashes
- Tempo médio de sessão
- Retenção de usuários
- Avaliações/reviews
- Downloads
- Atualizações

---

## CI/CD (Recomendação)

### GitHub Actions

Automatizar builds:

```yaml
name: EAS Build

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: eas build --platform all --non-interactive --no-wait
```

---

## Checklist Final de Publicação

### Código
- [ ] Ambiente de produção configurado
- [ ] Versões incrementadas (iOS e Android)
- [ ] Testes realizados
- [ ] Sem console.logs desnecessários
- [ ] Sem códigos de debug

### Assets
- [ ] Ícone de alta resolução
- [ ] Splash screen otimizada
- [ ] Screenshots atualizadas
- [ ] Vídeo de preview (opcional)

### Documentação
- [ ] Changelog atualizado
- [ ] Privacy Policy publicada
- [ ] Terms of Service publicados
- [ ] Support contact definido

### App Stores
- [ ] Descrições em PT e EN
- [ ] Keywords otimizadas
- [ ] Categoria correta
- [ ] Classificação etária
- [ ] Permissões justificadas

### Comunicação
- [ ] Equipe notificada
- [ ] Usuários avisados (se aplicável)
- [ ] Release notes preparadas

---

## Próximos Passos

Após publicação:

1. Monitorar reviews
2. Responder feedback
3. Corrigir bugs urgentes
4. Planejar próxima versão
5. Analisar métricas

---

## Recursos Úteis

- [Expo EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Policies](https://play.google.com/about/developer-content-policy/)
- [React Native Versioning](https://github.com/react-native-community/releases)
