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
│       └── users.cy.js
├── support/
│   └── api/
│       └── JsonPlaceholderService.js
└── fixtures/
    └── api/
        └── postPayloads.json
```

### 🔧 Camada de Serviço (JsonPlaceholderService)

```js
export class JsonPlaceholderService {
  static getPosts() {
    return cy.request({ method: "GET", url: "/posts" })
  }

  static getPostById(id) {
    return cy.request({ method: "GET", url: `/posts/${id}` })
  }

  static createPost(payload) {
    return cy.request({ method: "POST", url: "/posts", body: payload })
  }

  static updatePost(id, payload) {
    return cy.request({ method: "PUT", url: `/posts/${id}`, body: payload })
  }

  static deletePost(id) {
    return cy.request({ method: "DELETE", url: `/posts/${id}` })
  }
}
```

### ✅ Cenários de Teste Implementados

| Endpoint | Cenários |
|----------|----------|
| `GET /posts` | Validação status 200, retorno em lista |
| `GET /posts/{id}` | Validação status 200, campos da resposta |
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
│       ├── login.feature
│       └── checkout.feature
├── support/
│   ├── pages/
│   │   ├── LoginPage.js
│   │   ├── ProductsPage.js
│   │   └── CheckoutPage.js
│   └── step_definitions/
│       ├── login.steps.js
│       └── checkout.steps.js
└── fixtures/
    └── users.json
```

### 📝 Feature: Login

```gherkin
Feature: Login na aplicação
  Como um usuário da aplicação
  Quero realizar login
  Para acessar páginas restritas

  Scenario: Login com credenciais válidas
    Given que estou na página de login
    When informo usuário e senha válidos
    Then devo ser redirecionado para a página de produtos

  Scenario: Login com senha inválida
    Given que estou na página de login
    When informo usuário válido e senha inválida
    Then devo visualizar uma mensagem de erro

  Scenario: Login com campos obrigatórios em branco
    Given que estou na página de login
    When tento realizar login sem preencher os campos
    Then devo visualizar uma mensagem de erro
```

### 📝 Feature: Checkout

```gherkin
Feature: Checkout de compra

  Background:
    Given que estou logado na aplicação
    And adiciono um produto ao carrinho

  Scenario: Finalizar compra com dados válidos
    When preencho os dados de pagamento corretamente
    Then a compra deve ser finalizada com sucesso

  Scenario: Finalizar compra com dados inválidos
    When tento finalizar a compra com dados inválidos
    Then devo visualizar uma mensagem de erro no checkout
```

### 🔧 Page Objects

O projeto utiliza padrão **Page Object Model** para melhor organização:

- **LoginPage.js** - Elementos e ações da página de login
- **ProductsPage.js** - Elementos e ações da página de produtos
- **CheckoutPage.js** - Elementos e ações do checkout

---

## ⚡ Testes de Carga (K6)

Os testes de carga são realizados com **K6**, avaliando o comportamento de APIs sob alto volume de acessos simultâneos.

### 📁 Estrutura dos Testes de Carga

```
k6/
├── users-load-test.js    # Teste de carga principal
├── README.md             # Documentação K6
└── reports/              # Relatórios gerados
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

export default function () {
  const res = http.get('https://reqres.in/api/users?page=2');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 1s': (r) => r.timings.duration < 1000,
  });

  sleep(1);
}
```

### ✅ Cenários de Teste

| Cenário | Configuração |
|---------|--------------|
| Usuários Simultâneos | 500 VUs |
| Duração | 1 minuto |
| API Testada | https://reqres.in/api/users |
| Threshold | 95% das requisições < 1s |
| Taxa de Erro | < 1% |

### ▶️ Executar Testes de Carga

```bash
# Executar teste de carga básico
npm run test:load

# Executar e salvar resultado em JSON
npm run test:load:json

# Gerar relatório HTML
npm run test:load:html

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

### 📂 Artefatos Gerados

| Artefato | Descrição |
|----------|-----------|
| `cypress-reports` | Relatórios Cypress |
| `cypress-screenshots` | Screenshots em caso de falha |
| `cypress-videos` | Vídeos da execução dos testes |

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
│   │   │   └── users.cy.js
│   │   └── features/
│   │       ├── login.feature
│   │       └── checkout.feature
│   ├── support/
│   │   ├── api/
│   │   │   └── JsonPlaceholderService.js
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── ProductsPage.js
│   │   │   └── CheckoutPage.js
│   │   ├── step_definitions/
│   │   │   ├── login.steps.js
│   │   │   └── checkout.steps.js
│   │   ├── commands.js
│   │   └── e2e.js
│   ├── fixtures/
│   │   ├── users.json
│   │   └── api/
│   │       └── postPayloads.json
│   ├── reports/                   # Relatórios gerados
│   ├── screenshots/               # Screenshots de falhas
│   └── videos/                    # Vídeos dos testes
├── k6/
│   ├── users-load-test.js         # Teste de carga K6
│   └── README.md                  # Documentação K6
├── reports/                       # Relatórios consolidados
├── package.json
├── package-lock.json
└── README.md
```

---

## 📌 Considerações Finais

- **API Tests:** Arquitetura baseada em camada de serviço para chamadas de API
- **E2E Tests:** Padrão Page Object Model com BDD (Cucumber)
- **Load Tests:** Testes de performance com K6 (500 VUs, thresholds configurados)
- **CI/CD:** Integração completa com GitHub Actions
- **Reports:** Relatórios automatizados com Mochawesome e K6 HTML Reporter
- **Qualidade:** Foco em confiabilidade e boas práticas de automação

---

## 👤 Autor

**Tiago Amaro**  
QA / Automation Engineer

---

⭐ *Obrigado por visitar este projeto!*

