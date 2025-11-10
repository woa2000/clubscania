# Documentação - Scania Clube App

## Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura do Projeto](./ESTRUTURA.md)
3. [Configuração do Ambiente](./SETUP.md)
4. [Arquitetura](./ARQUITETURA.md)
5. [Componentes](./COMPONENTES.md)
6. [Telas/Páginas](./PAGINAS.md)
7. [Serviços e API](./SERVICOS.md)
8. [Navegação](./NAVEGACAO.md)
9. [Autenticação](./AUTENTICACAO.md)
10. [Internacionalização](./I18N.md)
11. [Build e Deploy](./BUILD-DEPLOY.md)

---

## Visão Geral

**Scania Clube** é uma aplicação mobile React Native desenvolvida com Expo, destinada aos associados do clube Scania. O aplicativo oferece funcionalidades para:

- Agendamento de atividades físicas
- Reservas de espaços
- Centro estético
- Gestão de exames médicos
- Eventos
- Lanchonete/restaurante
- Área de perfil do usuário

### Informações do Projeto

- **Nome**: Scania Clube
- **Versão Atual**: 1.1.4
- **Bundle ID (iOS)**: com.rasystem.appclubescania
- **Package Name (Android)**: com.rasystem.appclubescania
- **Version Code (Android)**: 14

### Stack Tecnológica

- **Framework**: React Native 0.73.6
- **Gerenciador**: Expo SDK 50
- **Linguagem**: TypeScript 5.3.0
- **Navegação**: React Navigation 6.x
- **Gerenciamento de Estado**: Context API
- **Estilização**: Styled Components 6.1.0
- **Requisições HTTP**: Axios 1.6.0
- **Formulários**: Formik 2.2.9, React Hook Form 7.18.0, Unform 2.1.6
- **Internacionalização**: React i18next

### Plataformas Suportadas

- ✅ iOS (iPhone)
- ✅ Android

### Ambientes

O projeto possui 3 ambientes de backend:

1. **Desenvolvimento**: `https://scania-clube-dev.azurewebsites.net/api`
2. **Homologação**: `https://scania-clube-homolog.azurewebsites.net/api` (atual)
3. **Produção**: `https://scania-clube.azurewebsites.net/api`

---

## Links Rápidos

- [Como configurar o ambiente de desenvolvimento](./SETUP.md)
- [Estrutura de pastas detalhada](./ESTRUTURA.md)
- [Guia de componentes](./COMPONENTES.md)
- [Documentação de serviços e API](./SERVICOS.md)
- [Como fazer build e publicar](./BUILD-DEPLOY.md)
