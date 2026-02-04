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

Os testes de API são executados utilizando a **JSONPlaceholder API**, uma API pública para testes.

### 📁 Estrutura dos Testes de API

```
cypress/
├── e2e/
│   └── api/
│       └── users.cy.js           # Testes de API
├── support/
│   └── api/
│       └── JsonPlaceholderService.js  # Camada de serviço
└── fixtures/
    └── api/
        └── postPayloads.json    # Payloads de teste
```

### ✅ Cenários de Teste Implementados

| Endpoint | Cenários |
|----------|----------|
| `GET /posts` | Validação status 200, retorno em lista |
| `POST /posts` | Validação status 201, estrutura do objeto criado |
| `PUT /posts/{id}` | Validação status 200, campos atualizados |
| `DELETE /posts/{id}` | Validação status 200 |

> **⚠️ Observação:** A JSONPlaceholder é uma API simulada. As operações de POST, PUT e DELETE não persistem dados.

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
│   ├── commands.js
│   └── e2e.js
└── fixtures/
    ├── users.json
    └── products.json
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
```

### 📝 Feature: Checkout

```gherkin
@checkout @smoke
Feature: Checkout de compra
  Como um usuário da aplicação
  Quero finalizar minha compra
  Para completar o processo de compra

  Background:
    Given que estou logado na aplicação
    And adiciono um produto ao carrinho
    And acesso o carrinho de compras
    And clico no botão de checkout

  @positive
  Scenario: Finalizar compra com dados válidos
    When preencho os dados de pagamento corretamente
    And finalizo a compra
    Then a compra deve ser finalizada com sucesso
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
  duration: '1m',        // por 1 minuto

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
│   │   │   └── users.cy.js        # Testes de API
│   │   └── features/
│   │       ├── login.feature      # Feature Login
│   │       └── checkout.feature   # Feature Checkout
│   ├── support/
│   │   ├── api/
│   │   │   └── JsonPlaceholderService.js
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
│   │   ├── commands.js
│   │   └── e2e.js
│   ├── fixtures/
│   │   ├── users.json
│   │   ├── products.json
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

