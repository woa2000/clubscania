# Guia de Continuidade - Nova Versão

## ⚠️ IMPORTANTE: Manter Continuidade com Versão Publicada

Esta nova versão **DEVE SER UMA ATUALIZAÇÃO** da versão atual publicada nas lojas, não um aplicativo novo. Para garantir isso:

---

## 1. Identificadores do App (NÃO MUDAR)

### iOS

**Bundle Identifier**: `com.rasystem.appclubescania`

**Arquivo**: `ios/ScaniaClube/Info.plist`

```xml
<key>CFBundleIdentifier</key>
<string>com.rasystem.appclubescania</string>
```

**Arquivo**: `app.json`

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.rasystem.appclubescania"
    }
  }
}
```

### Android

**Package Name**: `com.rasystem.appclubescania`

**Arquivo**: `android/app/build.gradle`

```gradle
defaultConfig {
    applicationId 'com.rasystem.appclubescania'
}
```

**Arquivo**: `app.json`

```json
{
  "expo": {
    "android": {
      "package": "com.rasystem.appclubescania"
    }
  }
}
```

---

## 2. Versionamento

### Versão Atual nas Lojas

- **iOS**: 1.1.4
- **Android**: 1.1.2 (versionName) / 14 (versionCode)

### Nova Versão (Recomendado)

- **Versão**: `2.0.0` (major update por ser reconstrução)
- **iOS Build**: 1
- **Android versionCode**: 15 (incrementar sempre)

### Atualizar Arquivos

#### app.json
```json
{
  "expo": {
    "version": "2.0.0",
    "android": {
      "versionCode": 15
    }
  }
}
```

#### android/app/build.gradle
```gradle
defaultConfig {
    versionCode 15
    versionName "2.0.0"
}
```

#### ios/ScaniaClube/Info.plist
```xml
<key>CFBundleShortVersionString</key>
<string>2.0.0</string>
<key>CFBundleVersion</key>
<string>1</string>
```

---

## 3. Credenciais e Certificados

### iOS

Você **DEVE** usar os mesmos certificados e provisioning profiles da versão publicada.

**Como obter**:
1. Apple Developer Portal → Certificates, Identifiers & Profiles
2. Procurar por `com.rasystem.appclubescania`
3. Usar certificados existentes ou gerar novos se expirados

**Com EAS**:
```bash
eas credentials
# Selecionar: Use existing credentials
```

### Android

Você **DEVE** usar o mesmo keystore da versão publicada.

**CRÍTICO**: Se você não tem o keystore original, **NÃO É POSSÍVEL** atualizar o app. Você teria que publicar um app novo com outro package name.

**Verificar keystore**:
```bash
keytool -list -v -keystore scania-clube.keystore
```

**Informações necessárias**:
- Keystore path
- Keystore password
- Key alias
- Key password

---

## 4. Contas das Lojas

### App Store Connect

**Informações necessárias**:
- Apple ID com acesso de desenvolvedor
- App ID: Procurar "Scania Clube" no App Store Connect
- Bundle ID deve ser `com.rasystem.appclubescania`

### Google Play Console

**Informações necessárias**:
- Conta Google com acesso de desenvolvedor
- App no console: Procurar "Scania Clube"
- Package name deve ser `com.rasystem.appclubescania`

---

## 5. Configurações Críticas

### Servidor Backend

**Atual (Homologação)**:
```typescript
baseURL: 'https://scania-clube-homolog.azurewebsites.net/api'
```

**Produção**:
```typescript
baseURL: 'https://scania-clube.azurewebsites.net/api'
```

⚠️ **Antes de publicar**, trocar para produção em `src/services/api.ts`

### AsyncStorage Keys

Mantenha as mesmas chaves para compatibilidade:
- `@ClubeScania:user`
- `@ClubeScania:token`
- `@ClubeScania:fileServer`
- `@ClubeScania:language`

### Deep Links (se configurados)

Manter scheme: `scaniaclube://` ou `exp+scaniaclube://`

---

## 6. Migração de Dados

Se você mudar estruturas de dados no AsyncStorage, crie migração:

```typescript
// src/utils/migrations.ts
export async function migrateUserData() {
  try {
    const oldUser = await AsyncStorage.getItem('@ClubeScania:user');
    
    if (oldUser) {
      const parsed = JSON.parse(oldUser);
      
      // Migrar estrutura se necessário
      const newUser = {
        ...parsed,
        // Adicionar novos campos
        newField: 'defaultValue'
      };
      
      await AsyncStorage.setItem('@ClubeScania:user', JSON.stringify(newUser));
    }
  } catch (error) {
    console.error('Erro na migração', error);
  }
}
```

Chamar no `App.tsx` antes de inicializar:

```typescript
useEffect(() => {
  async function initialize() {
    await migrateUserData();
    await SplashScreen.hideAsync();
  }
  
  if (fontsLoaded) {
    initialize();
  }
}, [fontsLoaded]);
```

---

## 7. Checklist Pré-Build

### Código

- [ ] Versões atualizadas corretamente
- [ ] Bundle ID/Package Name IGUAIS à versão publicada
- [ ] API de produção configurada
- [ ] Logs de debug removidos
- [ ] Console.logs desnecessários removidos
- [ ] Testes realizados

### Assets

- [ ] Ícone do app (deve ser o mesmo)
- [ ] Splash screen (pode ser atualizada)
- [ ] Screenshots para lojas

### Credenciais

- [ ] Certificados iOS válidos
- [ ] Keystore Android (MESMO da versão anterior)
- [ ] Acesso ao App Store Connect
- [ ] Acesso ao Google Play Console

### Backend

- [ ] API de produção testada
- [ ] Endpoints funcionando
- [ ] Servidor de arquivos acessível

---

## 8. Processo de Build

### 1. Testar Localmente

```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

### 2. Build de Preview

```bash
# iOS
eas build --platform ios --profile preview

# Android
eas build --platform android --profile preview
```

Testar o build em dispositivos reais.

### 3. Build de Produção

```bash
# iOS
eas build --platform ios --profile production

# Android
eas build --platform android --profile production
```

### 4. Submit

```bash
# iOS
eas submit --platform ios

# Android
eas submit --platform android
```

---

## 9. Após Publicação

### Monitoramento

1. **Primeiras 24h**: Monitorar crashes e erros
2. **App Store/Play Store**: Responder reviews
3. **Backend**: Monitorar logs de API
4. **Analytics**: Verificar métricas de uso

### Ferramentas Recomendadas

- **Sentry**: Crash reporting
- **Firebase Analytics**: Métricas de uso
- **App Store Connect Analytics**: Dados iOS
- **Google Play Console**: Dados Android

### Rollback se Necessário

Se houver problemas críticos:

**iOS**:
1. App Store Connect → Versões
2. Remover versão problemática da venda
3. Promover versão anterior

**Android**:
1. Play Console → Gestão de releases
2. Promover release anterior
3. Publicar

---

## 10. Compatibilidade com Versão Anterior

### Backend

Garantir que API é **retrocompatível**:
- Novos campos são opcionais
- Endpoints antigos continuam funcionando
- Não quebrar contratos existentes

### App

Se remover funcionalidades:
- Verificar se há usuários usando
- Adicionar migrations se necessário
- Comunicar mudanças aos usuários

---

## 11. Comunicação

### Usuários

1. **Release Notes**: Escrever changelog claro
2. **Notificação Push**: Avisar sobre atualização (opcional)
3. **E-mail**: Comunicar mudanças importantes

### Equipe

1. **Backend**: Coordenar deploy do backend
2. **Suporte**: Treinar sobre novas funcionalidades
3. **Marketing**: Preparar comunicação

---

## 12. Documentação de Release

Criar arquivo `CHANGELOG.md` na raiz:

```markdown
# Changelog

## [2.0.0] - 2025-11-10

### Adicionado
- Nova interface de usuário
- Melhorias de performance
- Suporte offline melhorado

### Modificado
- Fluxo de agendamento otimizado
- Telas de perfil redesenhadas

### Corrigido
- Bug no upload de exames
- Problema com notificações

### Removido
- (Se aplicável)
```

---

## 13. Primeiros Passos na Reconstrução

### Ordem Recomendada

1. **Setup Inicial**
   - [ ] Criar novo projeto Expo
   - [ ] Configurar TypeScript
   - [ ] Configurar ESLint/Prettier
   - [ ] Instalar dependências base

2. **Configuração**
   - [ ] Configurar `app.json` com IDs corretos
   - [ ] Configurar i18n
   - [ ] Configurar tema/estilos
   - [ ] Configurar navegação

3. **Autenticação**
   - [ ] Implementar AuthContext
   - [ ] Telas de login/cadastro
   - [ ] Integração com API
   - [ ] Persistência de sessão

4. **Módulos Principais**
   - [ ] Home
   - [ ] Atividades
   - [ ] Centro Estético
   - [ ] Eventos
   - [ ] Perfil

5. **Módulos Secundários**
   - [ ] Exames
   - [ ] Lanchonete
   - [ ] Espaços
   - [ ] Outros

6. **Refinamento**
   - [ ] Tratamento de erros
   - [ ] Loading states
   - [ ] Empty states
   - [ ] Validações

7. **Testes**
   - [ ] Testes unitários
   - [ ] Testes de integração
   - [ ] Testes em dispositivos reais

8. **Build e Deploy**
   - [ ] Build de preview
   - [ ] Testes de aceitação
   - [ ] Build de produção
   - [ ] Submit para lojas

---

## 14. Recursos Úteis

### Documentação
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native](https://reactnative.dev/)

### Ferramentas
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [Sentry](https://sentry.io/)
- [Firebase](https://firebase.google.com/)

### Comunidade
- [Expo Discord](https://chat.expo.dev/)
- [React Native Community](https://www.reactnative.dev/community/overview)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)

---

## 15. Suporte

Para dúvidas:
1. Consultar documentação nesta pasta `docs/`
2. Verificar código atual em `src/`
3. Consultar documentação oficial do Expo/React Native
4. Buscar na comunidade

---

## ✅ Checklist Final

Antes de publicar a nova versão:

### Identidade
- [ ] Bundle ID/Package Name iguais à versão anterior
- [ ] Nome do app igual
- [ ] Ícone igual ou atualizado

### Versões
- [ ] Versão incrementada corretamente
- [ ] versionCode Android incrementado
- [ ] Build number iOS configurado

### Credenciais
- [ ] Certificados iOS válidos ou reusados
- [ ] Keystore Android MESMO da versão anterior
- [ ] Acesso às contas das lojas

### Funcionalidades
- [ ] Todas as funcionalidades principais implementadas
- [ ] Login/Logout funcionando
- [ ] Agendamentos funcionando
- [ ] Upload de arquivos funcionando
- [ ] Navegação completa

### Qualidade
- [ ] Testado em iOS
- [ ] Testado em Android
- [ ] Sem crashes críticos
- [ ] Performance aceitável
- [ ] UI/UX polido

### Backend
- [ ] API de produção configurada
- [ ] Endpoints testados
- [ ] Servidor de arquivos acessível

### Lojas
- [ ] Screenshots atualizadas
- [ ] Descrição atualizada
- [ ] Release notes preparadas
- [ ] Privacy Policy válida

---

**Boa sorte com a reconstrução! 🚀**
