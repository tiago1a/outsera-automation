# 🚀 Cypress Automation Project

![CI/CD Pipeline](https://github.com/tiagoamaro/outsera-cypress-automation/actions/workflows/tests.yml/badge.svg)
![Cypress](https://img.shields.io/badge/Cypress-15.9.0-green)
![K6](https://img.shields.io/badge/K6-Load%20Tests-green)
![Node.js](https://img.shields.io/badge/Node.js-18.18.0-green)

Projeto de automação de testes com **Cypress** contendo testes de **API**, **E2E** e **Carga**, integrado em pipeline de CI/CD.

---

## 🎯 Features

| Tipo | Descrição | Status |
|------|-----------|--------|
| 🔌 **API Tests** | Testes de API com JSONPlaceholder | ✅ |
| 🌐 **E2E Tests** | Testes end-to-end com SauceDemo (Cucumber/BDD) | ✅ |
| ⚡ **Load Tests** | Testes de carga com K6 | ✅ |
| ⚡ **CI/CD** | Integração contínua com GitHub Actions | ✅ |
| 📊 **Reports** | Relatórios HTML automatizados | ✅ |

---

## 🧰 Tecnologias e Ferramentas

- **Node.js** 18.18.0
- **Cypress** 15.9.0
- **JavaScript**
- **Cucumber** (BDD)
- **K6** (Load Testing)
- **GitHub Actions** (CI/CD)
- **Mochawesome Reporter**
- **JSONPlaceholder API**
- **SauceDemo** (aplicação de teste E2E)

---

## 🔌 Testes de API

Os testes de API são executados utilizando a **JSONPlaceholder API**, com arquitetura escalável e reutilizável.

### 📁 Arquitetura dos Testes de API

```
cypress/
├── e2e/
│   └── api/
│       └── users.cy.js           # Testes de API
├── support/
│   └── api/
│       ├── base/
│       │   └── BaseService.js    # Classe base para serviços
│       ├── helpers/
│       │   ├── ApiAssertions.js  # Assertions reutilizáveis
│       │   └── RequestHelper.js  # Configurações centralizadas
│       ├── factories/
│       │   └── PostFactory.js    # Factory de payloads
│       └── JsonPlaceholderService.js  # Serviço específico
└── fixtures/
    └── api/
        └── postPayloads.json    # Payloads estáticos
```

### 🏗️ Componentes da Arquitetura

| Componente | Descrição | Benefício |
|------------|-----------|-----------|
| **BaseService** | Classe base com métodos HTTP genéricos (get, post, put, patch, delete) | Reutilização entre múltiplos serviços |
| **JsonPlaceholderService** | Service específico herdando BaseService | Separação de responsabilidades |
| **ApiAssertions** | 20+ métodos de validação reutilizáveis | Manutenibilidade centralizada |
| **RequestHelper** | Configurações centralizadas (headers, timeout, URLs) | Facilidade de mudança de ambiente |
| **PostFactory** | 10+ métodos para criar payloads dinâmicos | Dados de teste flexíveis |

### 🔧 JsonPlaceholderService

```javascript
import JsonPlaceholderService from '../../support/api/JsonPlaceholderService';
import ApiAssertions from '../../support/api/helpers/ApiAssertions';
import PostFactory from '../../support/api/factories/PostFactory';

// GET
JsonPlaceholderService.getPosts();
JsonPlaceholderService.getPostById(1);
JsonPlaceholderService.getPostsByUser(1);

// POST
JsonPlaceholderService.createPost(payload);

// PUT
JsonPlaceholderService.updatePost(1, payload);

// PATCH
JsonPlaceholderService.patchPost(1, payload);

// DELETE
JsonPlaceholderService.deletePost(1);
```

### 🎯 ApiAssertions (Exemplos de Uso)

```javascript
import ApiAssertions from '../../support/api/helpers/ApiAssertions';

// Validações de status
ApiAssertions.expectStatus(response, 200);
ApiAssertions.expectSuccess(response);
ApiAssertions.expectError(response);

// Validações de estrutura
ApiAssertions.expectArray(response);
ApiAssertions.expectObject(response);
ApiAssertions.expectPostStructure(response);
ApiAssertions.expectPostsArrayStructure(response);

// Validações de propriedades
ApiAssertions.expectProperty(response, 'id', 1);
ApiAssertions.expectProperties(response, ['id', 'title', 'body']);
ApiAssertions.expectCreatedId(response);

// Validações de performance
ApiAssertions.expectResponseTime(response, 2000);
```

### 🏭 PostFactory (Exemplos de Uso)

```javascript
import PostFactory from '../../support/api/factories/PostFactory';

// Payload completo
const fullPost = PostFactory.createPost();
// { title: 'Test Post Title', body: '...', userId: 1 }

// Payload mínimo
const minimalPost = PostFactory.createPostWithOnlyTitle();
// { title: 'Minimal Post Title' }

// Atualização parcial
const patchPayload = PostFactory.createPatchPayload();
// { title: 'Patched Title' }

// Payload com dados personalizados
const customPost = PostFactory.createPostWithData('Title', 'Body', 1);

// Lista de posts para testes em lote
const postList = PostFactory.createPostList(5);
```

### ✅ Cenários de Teste Implementados

| Endpoint | Cenários |
|----------|----------|
| `GET /posts` | Retornar lista, validar estrutura, validar response time |
| `GET /posts/{id}` | Retornar post específico, retornar 404 para não existente |
| `GET /posts?userId={id}` | Filtrar posts por userId |
| `POST /posts` | Criar com payload válido, título mínimo, campos extras, campos vazios |
| `PUT /posts/{id}` | Atualização completa, atualizar campos específicos |
| `PATCH /posts/{id}` | Atualização parcial (title), atualização do body, campos mistos |
| `DELETE /posts/{id}` | Deletar post, deletar post não existente |
| **Contract** | Validar estrutura de respostas de posts |

### 📊 Resumo dos Testes de API

| Método | Quantidade de Cenários |
|--------|------------------------|
| GET | 5 cenários |
| POST | 4 cenários |
| PUT | 2 cenários |
| PATCH | 3 cenários |
| DELETE | 3 cenários |
| Contract | 3 cenários |
| **Total** | **20 cenários** |

> **⚠️ Observação:** A JSONPlaceholder é uma API simulada. As operações de POST, PUT e DELETE não persistem dados.

### 🚀vantagens da Arquitetura

1. **Escalabilidade:** Adicionar nova API é simples - herdar BaseService e criar novo service
2. **Manutenção:** Mudar comportamento em um lugar reflete em todos os testes
3. **Reutilização:** Assertions, helpers e factories funcionam para qualquer service
4. **Legibilidade:** Testes focam em _o que testar_, não _como testar_
5. **Test Data Management:** Factory pattern permite criar dados dinâmicos

---

## 🌐 Testes E2E (Cucumber/BDD)

Os testes E2E utilizam **Cucumber** para implementação em BDD, testando a aplicação SauceDemo.

### 📁 Estrutura dos Testes E2E

```
cypress/
├── e2e/
│   └── features/
│       ├── login.feature       # Feature de Login
│       └── checkout.feature    # Feature de Checkout
├── support/
│   ├── step_definitions/
│   │   ├── login.steps.js     # Steps de Login
│   │   └── checkout.steps.js   # Steps de Checkout
│   ├── e2e/
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── ProductsPage.js
│   │   │   └── CheckoutPage.js
│   │   ├── constants/
│   │   │   └── Messages.js
│   │   └── helpers/
│   │       └── AssertionHelper.js
│   ├── pages/
│   │   ├── LoginPage.js
│   │   ├── ProductsPage.js
│   │   └── CheckoutPage.js
│   ├── commands.js
│   └── e2e.js
└── fixtures/
    ├── users.json
    ├── products.json
    └── environments.json
```

### 🎯 Padrões Implementados nos Testes E2E

| Padrão | Descrição | Benefício |
|--------|-----------|-----------|
| **Page Object Model** | Separação de UI e lógica de teste | Facilidade de manutenção |
| **Constants** | Centralização de mensagens e URLs | Facilidade de atualização |
| **AssertionHelper** | Validações reutilizáveis | Código mais limpo |
| **Fixtures Estruturados** | Dados de teste organizados | Facilidade de manutenção |

### 📝 Feature: Login

```gherkin
@login @smoke
Feature: Login na aplicação
  Como um usuário da aplicação
  Quero realizar login
  Para acessar páginas restritas

  @positive
  Scenario: Login com credenciais válidas
    Given que estou na página de login
    When informo usuário e senha válidos
    Then devo ser redirecionado para a página de produtos

  @negative
  Scenario: Login com senha inválida
    Given que estou na página de login
    When informo usuário válido e senha inválida
    Then devo visualizar uma mensagem de erro

  @negative @validation
  Scenario: Login com campos obrigatórios em branco
    Given que estou na página de login
    When tento realizar login sem preencher os campos
    Then devo visualizar a mensagem de erro de login obrigatório

  @negative
  Scenario: Login com usuário bloqueado
    Given que estou na página de login
    When informo usuário "locked_out" e senha "secret_sauce"
    Then devo visualizar uma mensagem de erro
```

### 📝 Feature: Checkout

```gherkin
@checkout
Feature: Checkout de compra
  Como um usuário da aplicação
  Quero finalizar minha compra
  Para completar o processo de compra

  @positive
  Scenario: Finalizar compra com dados válidos
    Given que estou logado com usuário "standard"
    And adiciono um produto ao carrinho
    And estou na página de checkout
    When preencho os dados de checkout com dados válidos
    And clico em continue
    And finalizo a compra
    Then a compra deve ser finalizada com sucesso

  @negative @validation
  Scenario: Checkout com campos obrigatórios em branco
    Given que estou logado com usuário "standard"
    And adiciono um produto ao carrinho
    And estou na página de checkout
    When preencho os dados de checkout com dados inválidos
    And clico em continue
    Then devo visualizar a mensagem de erro de checkout obrigatório

  @negative @validation
  Scenario: Checkout com postal code vazio
    Given que estou logado com usuário "standard"
    And adiciono um produto ao carrinho
    And estou na página de checkout
    When preencho apenas nome e sobrenome
    And clico em continue
    Then devo visualizar a mensagem de erro de postal code obrigatório
```

### 🔧 Page Objects

O projeto utiliza padrão **Page Object Model** para melhor organização:

```javascript
// LoginPage.js
class LoginPage {
  elements = {
    usernameField: '[data-test="username"]',
    passwordField: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    errorMessage: '[data-test="error"]',
  };

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickLogin();
    return this;
  }

  loginWithFixture(userType) {
    cy.fixture("users").then((users) => {
      const user = users[userType];
      this.fillUsername(user.username);
      this.fillPassword(user.password);
      this.clickLogin();
    });
    return this;
  }
}
```

### 📋 Constants Centralizadas

```javascript
// Messages.js
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: "Error: First Name is required",
  INVALID_CREDENTIALS: "Epic sadface: Username and password do not match any user in this service",
  LOCKED_OUT_USER: "Epic sadface: Sorry, this user has been locked out.",
};

export const URLs = {
  LOGIN: "",
  INVENTORY: "inventory.html",
  CART: "cart.html",
  CHECKOUT_STEP_ONE: "checkout-step-one.html",
};
```

---

## ⚡ Testes de Carga (K6)

Os testes de carga são realizados com **K6**, avaliando o comportamento de APIs sob alto volume de acessos simultâneos.

### 📁 Estrutura dos Testes de Carga

```
k6/
├── users-load-test.js    # Teste de carga principal
└── README.md            # Documentação K6
```

### 🔧 Configuração do Teste

```javascript
export const options = {
  vus: 500,              // 500 usuários simultâneos
  duration: '5m',        // por 5 minuto

  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% das requisições abaixo de 1s
    http_req_failed: ['rate<0.01'],    // menos de 1% de erro
  },
};
```

### ▶️ Executar Testes de Carga

```bash
# Executar teste de carga básico
npm run test:load

# Executar e gerar relatório completo
npm run test:load:report
```

---

## ⚡ Pipeline CI/CD

O projeto está integrado com **GitHub Actions** para execução automática dos testes.

### 🚦 Status da Pipeline

![CI/CD Pipeline](https://github.com/tiagoamaro/outsera-cypress-automation/actions/workflows/tests.yml/badge.svg)

### 📋 Fluxo da Pipeline

```
Push/PR → Checkout → Setup Node.js → Install Dependencies
    → Run All Tests → Upload Reports → Upload Screenshots (on failure)
    → Upload Videos (on failure)
```

---

## ▶️ Como Executar

### 1️⃣ Instalar dependências

```bash
npm install
```

### 2️⃣ Executar testes de API

```bash
npm run test:api
```

### 3️⃣ Executar testes E2E

```bash
npm run test:ui
```

### 4️⃣ Executar testes de carga (K6)

```bash
npm run test:load:report
```

### 5️⃣ Executar todos os testes

```bash
npx cypress run
```

### 6️⃣ Abrir Cypress em modo interativo

```bash
npm run cypress:open
```

### 7️⃣ Gerar Relatório Consolidado

```bash
npm run report:merge
npm run report:generate
```

O relatório estará disponível em: `cypress/reports/report.html`

---

## 📁 Estrutura Completa do Projeto

```
outsera-cypress-automation/
├── .github/
│   └── workflows/
│       └── tests.yml              # Pipeline CI/CD
├── cypress/
│   ├── config.js                  # Configuração E2E
│   ├── api.config.js              # Configuração API
│   ├── e2e/
│   │   ├── api/
│   │   │   └── users.cy.js        # Testes de API (refatorado)
│   │   └── features/
│   │       ├── login.feature      # Feature Login
│   │       └── checkout.feature   # Feature Checkout
│   ├── support/
│   │   ├── api/
│   │   │   ├── base/
│   │   │   │   └── BaseService.js         # Classe base para serviços
│   │   │   ├── helpers/
│   │   │   │   ├── ApiAssertions.js       # Assertions reutilizáveis
│   │   │   │   └── RequestHelper.js      # Configurações centralizadas
│   │   │   ├── factories/
│   │   │   │   └── PostFactory.js        # Factory de payloads
│   │   │   └── JsonPlaceholderService.js  # Serviço específico
│   │   ├── step_definitions/
│   │   │   ├── login.steps.js
│   │   │   └── checkout.steps.js
│   │   ├── e2e/
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.js
│   │   │   │   ├── ProductsPage.js
│   │   │   │   └── CheckoutPage.js
│   │   │   ├── constants/
│   │   │   │   └── Messages.js
│   │   │   └── helpers/
│   │   │       └── AssertionHelper.js
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── ProductsPage.js
│   │   │   └── CheckoutPage.js
│   │   ├── commands.js
│   │   └── e2e.js
│   ├── fixtures/
│   │   ├── users.json
│   │   ├── products.json
│   │   ├── environments.json
│   │   └── api/
│   │       └── postPayloads.json
│   ├── reports/                   # Relatórios gerados
│   ├── screenshots/              # Screenshots de falhas
│   └── videos/                   # Vídeos dos testes
├── k6/
│   ├── users-load-test.js        # Teste de carga K6
│   └── README.md                 # Documentação K6
├── reports/                      # Relatórios consolidados
├── package.json
├── package-lock.json
└── README.md
```

---

## 📌 Considerações Finais

- **API Tests:** Testes funcionais de API com JSONPlaceholder
- **E2E Tests:** Padrão Page Object Model com BDD (Cucumber)
- **Load Tests:** Testes de performance com K6 (500 VUs, thresholds configurados)
- **CI/CD:** Integração completa com GitHub Actions
- **Reports:** Relatórios automatizados com Mochawesome
- **Qualidade:** Foco em confiabilidade e boas práticas de automação

---

## 👤 Autor

**Tiago Amaro**  
QA / Automation Engineer

---

⭐ *Obrigado por visitar este projeto!*

