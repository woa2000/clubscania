
# Plano de Desenvolvimento - Reconstrução Scania Clube App

Este documento serve como um guia para a reconstrução e desenvolvimento do aplicativo Scania Clube. O plano está baseado na documentação existente e segue uma abordagem iterativa, começando pela fundação da aplicação (estrutura e autenticação) e evoluindo para os módulos de funcionalidades.

---

## Fase 0: Estrutura do Projeto e Configuração Inicial

**Objetivo:** Adaptar a estrutura documentada para o padrão do Expo Router e configurar a base do projeto.

### Etapa 0.1: Criar Estrutura de Pastas
- [ ] Criar as pastas que ainda não existem na raiz do projeto, conforme `docs/ESTRUTURA.md`:
  - `components`
  - `contexts`
  - `services`
  - `global`
  - `global/styles`
  - `languages`
  - `utils`
  - `@types`

### Etapa 0.2: Configurar Serviço de API
- [ ] Criar o arquivo `services/api.ts`.
- [ ] Dentro de `api.ts`, configurar a instância do Axios com a `baseURL` de homologação: `https://scania-clube-homolog.azurewebsites.net/api`.

### Etapa 0.3: Configurar Tema Global
- [ ] Criar o arquivo `global/styles/theme.ts`.
- [ ] Adicionar as cores e fontes do projeto ao `theme.ts`, conforme especificado em `docs/ESTRUTURA.md`.
- [ ] No layout raiz (`app/_layout.tsx`), importar e envolver a aplicação com o `ThemeProvider` do `styled-components`, provendo o tema criado.

### Etapa 0.4: Configurar Internacionalização (i18n)
- [ ] Criar o arquivo `languages/i18n.js` com a configuração do `i18next`.
- [ ] Criar os arquivos de tradução `languages/portuguese.json` and `languages/english.json`.
- [ ] Importar e inicializar o `i18n` no layout raiz (`app/_layout.tsx`).

---

## Fase 1: Autenticação e Navegação Principal

**Objetivo:** Replicar o fluxo de autenticação e a navegação principal usando Expo Router.

### Etapa 1.1: Implementar o `AuthContext`
- [ ] Criar o arquivo `contexts/auth.tsx`.
- [ ] Implementar o `AuthContext` com o estado (`signed`, `user`, `loading`) e as funções (`signIn`, `signOut`) detalhadas em `docs/AUTENTICACAO.md`.
- [ ] Implementar a função `loadStorage` dentro do contexto para carregar o token e os dados do usuário do `AsyncStorage` ao iniciar o app.

### Etapa 1.2: Criar Layouts de Rota (Expo Router)
- [ ] **Layout Raiz (`app/_layout.tsx`):** Transformá-lo no controlador principal de navegação, utilizando o `AuthContext` para exibir o grupo de rotas `(auth)` ou `(app)`.
- [ ] **Layout de Autenticação (`app/(auth)/_layout.tsx`):** Configurar um `Stack` navigator para agrupar as telas de autenticação.
- [ ] **Layout Principal (`app/(app)/_layout.tsx`):** Configurar um `Stack` navigator que servirá de base para a área logada.

### Etapa 1.3: Criar Telas de Autenticação
- [ ] Criar o arquivo `app/(auth)/sign-in.tsx` com a UI e lógica para o login.
- [ ] Criar o arquivo `app/(auth)/sign-up.tsx` com o formulário de cadastro.
- [ ] Criar o arquivo `app/(auth)/forgot-password.tsx` para a recuperação de senha.

### Etapa 1.4: Conectar Lógica de Autenticação
- [ ] No `app/(auth)/sign-in.tsx`, conectar a ação do botão "Entrar" à função `signIn` do `AuthContext`.
- [ ] Implementar o redirecionamento automático para a rota `(app)` após o login bem-sucedido.

---

## Fase 2: Construção do Core da Aplicação (Área Logada)

**Objetivo:** Montar a estrutura de navegação da área principal do app.

### Etapa 2.1: Implementar Navegação por Abas (Tabs)
- [ ] Alterar o `app/(app)/_layout.tsx` para usar o `Tabs` navigator do Expo Router.
- [ ] Criar as 5 abas principais definidas em `docs/NAVEGACAO.md`: Início, Atividades, Centro Estético, Espaços e Perfil.
- [ ] Criar os arquivos de tela (placeholders) para cada aba:
  - `app/(app)/home.tsx`
  - `app/(app)/atividades.tsx`
  - `app/(app)/centro-estetico.tsx`
  - `app/(app)/espacos.tsx`
  - `app/(app)/perfil.tsx`

### Etapa 2.2: Desenvolver Componente Header
- [ ] Criar a pasta `components/Header`.
- [ ] Desenvolver o componente reutilizável `Header` conforme a especificação de `docs/COMPONENTES.md`.
- [ ] Utilizar o `Header` nas telas que necessitarem de um cabeçalho customizado.

---

## Fase 3: Desenvolvimento Iterativo dos Módulos

**Objetivo:** Desenvolver cada funcionalidade do aplicativo de forma modular e iterativa.

### Etapa 3.1: Módulo Home
- [ ] **UI:** Desenvolver a interface da tela `app/(app)/home.tsx` com Banners, Categorias e Atividades Curtidas.
- [ ] **Componentes:** Criar os componentes `BannerPromotion` e `Category` na pasta `components`.
- [ ] **Serviço:** Implementar o arquivo `services/home.ts` para buscar os dados da API.

### Etapa 3.2: Módulo de Perfil
- [ ] **Telas:** Desenvolver as telas do fluxo de perfil: `MenuProfile`, `Profile` (Meus Dados), `ChangePassword` e `Language`.
- [ ] **Serviço:** Implementar `services/user.ts` para buscar e atualizar os dados do usuário.

### Etapa 3.3: Módulo de Atividades
- [ ] **Telas:** Desenvolver o fluxo completo: Lista (`Activitys`) → Detalhes (`ActivityDetail`) → Reserva (`ActivityReserve`) → Histórico (`ActivitysHistory`).
- [ ] **Serviço:** Implementar `services/activity.ts` para gerenciar os dados das atividades.

### Etapa 3.4: Demais Módulos
- [ ] **Centro Estético:** Desenvolver o fluxo de listagem de serviços, seleção de profissional e agendamento. Implementar `services/beautyCenter.ts`.
- [ ] **Eventos:** Desenvolver o fluxo de listagem, detalhes e inscrição em eventos. Implementar `services/events.ts`.
- [ ] **Exames:** Desenvolver o fluxo de visualização de status e upload de exames. Implementar `services/exams.ts`.
- [ ] **Lanchonete:** Desenvolver a visualização do cardápio. Implementar `services/snackBar.ts`.
- [ ] **Espaços:** Desenvolver o fluxo de reserva de espaços. Implementar `services/space.ts`.

---

## Fase 4: Finalização, Testes e Deploy

**Objetivo:** Garantir a qualidade, a continuidade da versão publicada e realizar o deploy da nova versão.

### Etapa 4.1: Revisão de Continuidade
- [ ] Verificar se o `bundleIdentifier` (iOS) e o `package` (Android) em `app.json` estão **exatamente iguais** aos da versão em produção, conforme `docs/CONTINUIDADE.md`.
- [ ] Incrementar o `version` e `android.versionCode` no `app.json`.

### Etapa 4.2: Testes Funcionais
- [ ] Realizar um teste ponta a ponta em todas as funcionalidades críticas listadas em `docs/BUILD-DEPLOY.md`.
- [ ] Testar em dispositivos físicos Android e iOS.

### Etapa 4.3: Preparação para Build
- [ ] No `services/api.ts`, alterar a `baseURL` para a URL de **produção**: `https://scania-clube.azurewebsites.net/api`.
- [ ] Remover todos os `console.log` e logs de debug do código.

### Etapa 4.4: Build e Deploy
- [ ] Seguir rigorosamente as instruções do documento `docs/BUILD-DEPLOY.md` para gerar os builds de produção via EAS Build e submetê-los para a App Store e Google Play.
