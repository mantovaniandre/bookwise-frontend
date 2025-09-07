# 📖 BookWise Frontend

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

## 🌟 Sobre o Projeto

**BookWise Frontend** é uma aplicação web moderna desenvolvida em Angular/TypeScript para gerenciar uma plataforma completa de e-commerce de livros. A interface oferece uma experiência de usuário intuitiva e responsiva, conectando-se com a API REST do backend para oferecer funcionalidades completas de compra, busca e gerenciamento de livros.

### 🔗 Backend Repository

Este projeto funciona em conjunto com o **BookWise Backend**:
- 🎯 **Backend Repository**: [bookwise-backend](https://github.com/mantovaniandre/bookwise-backend)
- 🚀 **Tecnologias Backend**: Python, Flask, MySQL, JWT

## ⚡ Principais Funcionalidades

- 🏠 **Página Inicial**: Catálogo completo de livros com navegação intuitiva
- 🔐 **Autenticação**: Sistema de login e registro de usuários
- 📚 **Gerenciamento de Livros**: Visualização, busca e filtragem de livros
- 🛒 **Carrinho de Compras**: Adição, remoção e gestão de itens
- 💳 **Checkout**: Processo completo de finalização de compras
- 👤 **Perfil do Usuário**: Gerenciamento de dados pessoais e histórico
- 🔍 **Busca Avançada**: Pesquisa por título, autor, categoria
- 📱 **Design Responsivo**: Interface adaptável a todos os dispositivos
- 📊 **Dashboard**: Painel administrativo para gerenciamento de livros

## 🛠 Tecnologias Utilizadas

- **Framework**: Angular 15
- **Linguagem**: TypeScript 4.9
- **Estilização**: Bootstrap 5, CSS3
- **HTTP Client**: Axios para requisições API
- **State Management**: RxJS
- **Componentes UI**: ngx-bootstrap, ngx-pagination
- **Notificações**: SweetAlert2
- **Utilitários**: Lodash, date-fns
- **Testes**: Jasmine, Karma

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js 16+ 
- npm ou yarn
- Angular CLI (`npm install -g @angular/cli`)

## 🚀 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/mantovaniandre/bookwise-frontend.git
cd bookwise-frontend/bookwise
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure a URL da API
Edite o arquivo de configuração para apontar para sua API backend:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000' // URL do seu backend
};
```

### 4. Execute a aplicação
```bash
# Desenvolvimento
npm run start
# ou
ng serve

# Build de produção
npm run build
# ou
ng build
```

A aplicação estará disponível em: `http://localhost:4200`

## 🏗 Arquitetura do Projeto

```
src/
├── app/
│   ├── cart/              # Componente do carrinho
│   ├── checkout/          # Processo de finalização
│   ├── create-book/       # Criação de livros (admin)
│   ├── create-user/       # Registro de usuários
│   ├── dashboard/         # Painel administrativo
│   ├── footer/            # Rodapé da aplicação
│   ├── header/            # Cabeçalho e navegação
│   ├── home/              # Página inicial
│   ├── learn-more/        # Informações sobre livros
│   ├── login/             # Autenticação de usuários
│   ├── my-account/        # Perfil do usuário
│   ├── my-requests/       # Histórico de compras
│   ├── search-book/       # Busca de livros
│   ├── update-book/       # Edição de livros (admin)
│   ├── utils/             # Utilitários e serviços
│   ├── app.component.*    # Componente raiz
│   └── app.module.ts      # Módulo principal
├── assets/                # Recursos estáticos
├── environments/          # Configurações de ambiente
└── styles.css            # Estilos globais
```

## 🎨 Componentes Principais

### 🏠 **Home Component**
- Exibição do catálogo de livros
- Navegação e filtros
- Adicionar livros ao carrinho

### 🛒 **Cart Component**
- Visualização de itens selecionados
- Atualização de quantidades
- Remoção de itens

### 💳 **Checkout Component**
- Formulário de dados pessoais
- Processamento de pagamento
- Confirmação de pedido

### 👤 **User Account Components**
- Login/Registro
- Perfil do usuário
- Histórico de compras

### 📚 **Book Management**
- CRUD de livros (admin)
- Busca e filtros
- Detalhes dos livros

## 🔧 Scripts Disponíveis

```bash
# Servidor de desenvolvimento
npm run start

# Build para produção
npm run build

# Executar testes
npm run test

# Build e observar mudanças
npm run watch

# Verificar código Angular
ng lint
```

## 🧪 Testando a Aplicação

### Executar Testes
```bash
# Testes unitários
npm run test

# Executar testes em modo watch
ng test --watch
```

### Ambiente de Desenvolvimento
1. Inicie o backend na porta 5000
2. Execute `npm run start`
3. Acesse `http://localhost:4200`
4. Teste as funcionalidades integradas

## 🔒 Autenticação

A aplicação utiliza JWT (JSON Web Tokens) para autenticação:
- Login com email/senha
- Armazenamento seguro do token
- Interceptors para requisições autenticadas
- Proteção de rotas administrativas

## 📱 Design Responsivo

- **Mobile First**: Interface otimizada para dispositivos móveis
- **Bootstrap Grid**: Sistema de grid responsivo
- **Breakpoints**: Adaptação automática para diferentes telas
- **Touch Friendly**: Botões e elementos otimizados para touch

## 🚀 Deploy

### Build de Produção
```bash
ng build --prod
```

### Deploy na Netlify
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Deploy
npm run build
netlify deploy --prod --dir=dist/bookwise
```

### Deploy no Vercel
```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contato

**André Mantovani** - Desenvolvedor Full Stack

- 💼 [LinkedIn](https://linkedin.com/in/mantovaniandre)
- 📧 Email: andreluizdiasmantovani@gmail.com
- 🌐 Site: https://amantovani.netlify.app/
- 🐙 GitHub: [@mantovaniandre](https://github.com/mantovaniandre)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela no repositório!**

### 🔗 Projetos Relacionados
- [BookWise Backend](https://github.com/mantovaniandre/bookwise-backend) - API REST Python/Flask
- [Outros projetos no meu perfil](https://github.com/mantovaniandre)

---
*Desenvolvido com ❤️ por [André Mantovani](https://github.com/mantovaniandre)*