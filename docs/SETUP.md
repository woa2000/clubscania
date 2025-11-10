# Configuração do Ambiente

## Pré-requisitos

### Obrigatórios

- **Node.js**: versão 18.x ou superior
- **npm** ou **yarn**
- **Git**
- **Expo CLI**: `npm install -g expo-cli`
- **EAS CLI**: `npm install -g eas-cli`

### Para Desenvolvimento iOS

- **macOS** (obrigatório)
- **Xcode** 14+ com Command Line Tools
- **CocoaPods**: `sudo gem install cocoapods`
- **Conta Apple Developer** (para build e publicação)

### Para Desenvolvimento Android

- **Android Studio**
- **JDK** 11 ou superior
- **Android SDK** (API Level 33+)
- Variáveis de ambiente configuradas:
  - `ANDROID_HOME`
  - `JAVA_HOME`

---

## Instalação

### 1. Clonar o Repositório

```bash
git clone <repository-url>
cd CS-APP-Clube-Scania
```

### 2. Instalar Dependências

```bash
npm install --legacy-peer-deps
```

⚠️ **Importante**: Use a flag `--legacy-peer-deps` devido a conflitos de dependências entre algumas bibliotecas.

### 3. Configurar iOS (somente macOS)

```bash
cd ios
pod install
cd ..
```

---

## Execução

### Modo Desenvolvimento (Expo Go)

```bash
npm start
# ou
npx expo start
```

Isso abrirá o Metro Bundler. Você pode:
- Pressionar `i` para abrir no simulador iOS
- Pressionar `a` para abrir no emulador Android
- Escanear o QR Code com o app Expo Go (dispositivo físico)

### Build de Desenvolvimento

#### iOS

```bash
npx expo run:ios
```

#### Android

```bash
npx expo run:android
```

---

## Configuração de Ambiente

### Variáveis de Ambiente

O projeto não usa arquivo `.env` atualmente. A URL do backend é configurada diretamente em:

**Arquivo**: `src/services/api.ts`

```typescript
const api = axios.create({
  baseURL: 'https://scania-clube-homolog.azurewebsites.net/api'
})
```

Para trocar o ambiente, comente/descomente a linha correspondente.

### Recomendação para Reconstrução

Considere implementar variáveis de ambiente usando:

```bash
npm install react-native-dotenv
```

E criar arquivos:
- `.env.development`
- `.env.staging`
- `.env.production`

---

## Estrutura de Configuração

### package.json

Scripts disponíveis:

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web"
  }
}
```

### app.json

Configurações do Expo:

```json
{
  "expo": {
    "name": "Scania Clube",
    "slug": "ScaniaClube",
    "version": "1.1.4",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#1F2C73"
    },
    "ios": {
      "bundleIdentifier": "com.rasystem.appclubescania"
    },
    "android": {
      "package": "com.rasystem.appclubescania",
      "versionCode": 14
    }
  }
}
```

### tsconfig.json

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}
```

### babel.config.js

```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { 
        lazyImports: true,
        native: {
          transformProfile: 'default'
        }
      }]
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', {
        helpers: true,
        regenerator: true
      }],
      ['@babel/plugin-transform-modules-commonjs', {
        allowTopLevelThis: true,
        loose: true
      }]
    ]
  };
};
```

---

## Solução de Problemas Comuns

### Erro de Dependências de Peer

```bash
npm install --legacy-peer-deps
```

### Porta 8081 em Uso

```bash
lsof -ti:8081 | xargs kill -9 2>/dev/null
```

### Cache do Metro Bundler

```bash
npx expo start --clear
```

### Pods iOS Desatualizados

```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Erro de Memória no Build Android

Edite `android/gradle.properties`:

```properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
```

---

## Próximos Passos

Após configurar o ambiente:

1. Leia a [Arquitetura do Projeto](./ARQUITETURA.md)
2. Explore a [Estrutura de Pastas](./ESTRUTURA.md)
3. Entenda os [Serviços e API](./SERVICOS.md)
