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
| 🔌 **API Tests** | Testes de API escaláveis com JSONPlaceholder | ✅ |
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

## 🔌 Testes de API (Arquitetura Escalável)

Os testes de API são desenvolvidos com uma **arquitetura escalável** que maximiza o reaproveitamento de código e facilita a manutenção.

### 📁 Estrutura do Projeto de API

```
cypress/
├── e2e/
│   └── api/
│       └── users.cy.js              # Testes organizados por suites
├── support/
│   └── api/
│       ├── base/
│       │   └── BaseService.js       # Classe base com métodos HTTP genéricos
│       ├── helpers/
│       │   ├── ApiAssertions.js     # Assertions reutilizáveis
│       │   └── RequestHelper.js     # Configurações de requisição
│       ├── factories/
│       │   └── PostFactory.js      # Factory para criação de payloads
│       └── services/
│           └── JsonPlaceholderService.js  # Service específico
└── fixtures/
    └── api/
        └── schemas/
            └── posts.schema.json    # JSON Schemas para validação
```

### 🏗️ Arquitetura

```
                    ┌─────────────────────────────────────┐
                    │         users.cy.js                │
                    │     (Test Suites - BDD Style)       │
                    └──────────────┬──────────────────────┘
                                   │
                    ┌──────────────▼──────────────────────┐
                    │      JsonPlaceholderService         │
                    │      (Service Layer)               │
                    └──────────────┬──────────────────────┘
                                   │
          ┌────────────────────────┼────────────────────────┐
          │                        │                        │
┌─────────▼─────────┐  ┌─────────▼─────────┐  ┌─────────▼─────────┐
│    BaseService     │  │    PostFactory     │  │   ApiAssertions   │
│  (HTTP Methods)    │  │  (Data Builders)  │  │  (Validations)    │
└───────────────────┘  └───────────────────┘  └───────────────────┘
```

### 🔧 Componentes da Arquitetura

#### 1. BaseService
Classe base com métodos HTTP genéricos reutilizáveis:

```javascript
class BaseService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(endpoint, options = {}) { }
  post(endpoint, body, options = {}) { }
  put(endpoint, body, options = {}) { }
  patch(endpoint, body, options = {}) { }
  delete(endpoint, options = {}) { }
  withAuth(endpoint, options = {}, token) { }
}
```

#### 2. JsonPlaceholderService
Service específico que herda do BaseService:

```javascript
class JsonPlaceholderService extends BaseService {
  constructor() {
    super('https://jsonplaceholder.typicode.com');
  }

  // CRUD Operations
  getAllPosts(options = {}) { }
  getPostById(id, options = {}) { }
  createPost(payload, options = {}) { }
  updatePost(id, payload, options = {}) { }
  patchPost(id, payload, options = {}) { }
  deletePost(id, options = {}) { }

  // Custom Endpoints
  getPostsByUser(userId, options = {}) { }
  getPostsPaginated(page, perPage, options = {}) { }

  // Test Helpers
  async createPostAndGetId(payload) { }
  async verifyPostExists(id) { }
  async verifyPostDeleted(id) { }
  validatePostStructure(response) { }
}
```

#### 3. ApiAssertions
Assertions centralizados e reutilizáveis:

```javascript
class ApiAssertions {
  static expectStatus(response, expectedStatus) { }
  static expectSuccess(response) { }
  static expectResponseTime(response, maxMs) { }
  static expectArray(response, property = null) { }
  static expectObject(response, property = null) { }
  static expectProperty(response, property, value = null) { }
  static expectProperties(response, properties) { }
  static expectCreatedId(response) { }
  static expectPagination(response) { }
  static expectArrayLength(response, expectedLength, property = null) { }
}
```

#### 4. PostFactory
Factory para geração dinâmica de payloads:

```javascript
class PostFactory {
  createValid() { }
  createWithEmptyTitle() { }
  createWithEmptyBody() { }
  createWithInvalidUserId() { }
  createWithExtraFields() { }
  createPartial() { }
  createMultiple(count = 3) { }
  create(customData = {}) { }
}
```

#### 5. RequestHelper
Configurações centralizadas de requisições:

```javascript
class RequestHelper {
  getDefaultHeaders() { }
  getAuthHeaders(token) { }
  getBaseOptions(additionalOptions = {}) { }
  getOptionalOptions() { }
  getTimeoutOptions(timeout = 30000) { }
  buildUrlWithParams(baseUrl, endpoint, params = {}) { }
}
```

### ✅ Cenários de Teste Implementados

| Suite | Cenários |
|-------|----------|
| **GET /posts** | Lista de posts, estrutura válida, response time |
| **GET /posts/{id}** | Post por ID, 404 para inexistente, validação estrutura |
| **POST /posts** | Criação válida, campos extras, ID inválido, campos faltantes |
| **PUT /posts/{id}** | Update completo, update parcial |
| **PATCH /posts/{id}** | Update parcial, múltiplos campos |
| **DELETE /posts/{id}** | Delete existente, delete inexistente |
| **Custom** | Filtro por usuário, paginação |
| **Integration** | CRUD completo, operações em lote |

### 📊 JSON Schema para Validação de Contratos

```json
{
  "title": "Post",
  "type": "object",
  "required": ["userId", "id", "title", "body"],
  "properties": {
    "userId": { "type": "integer" },
    "id": { "type": "integer" },
    "title": { "type": "string", "minLength": 1 },
    "body": { "type": "string", "minLength": 1 }
  },
  "additionalProperties": false
}
```

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

### 📝 Features

**Login Feature:**
- Login com credenciais válidas
- Login com senha inválida
- Login com campos obrigatórios em branco

**Checkout Feature:**
- Finalizar compra com dados válidos
- Finalizar compra com dados inválidos

### 🔧 Page Objects

O projeto utiliza padrão **Page Object Model**:
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
  duration: '1m',        // por 1 minuto

  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% das requisições < 1s
    http_req_failed: ['rate<0.01'],    // menos de 1% de erro
  },
};
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
npm run test:load:report
```

O relatório HTML será gerado em: `reports/k6-report.html`

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

### 5️⃣ Executar todos os testes Cypress

```bash
npx cypress run
```

### 6️⃣ Abrir Cypress em modo interativo

```bash
npm run cypress:open
```

### 📊 Gerar Relatório Consolidado (Cypress)

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
│   │   │   └── users.cy.js
│   │   └── features/
│   │       ├── login.feature
│   │       └── checkout.feature
│   ├── support/
│   │   ├── api/
│   │   │   ├── base/
│   │   │   │   └── BaseService.js
│   │   │   ├── helpers/
│   │   │   │   ├── ApiAssertions.js
│   │   │   │   └── RequestHelper.js
│   │   │   ├── factories/
│   │   │   │   └── PostFactory.js
│   │   │   └── services/
│   │   │       └── JsonPlaceholderService.js
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
│   │   ├── api/
│   │   │   ├── postPayloads.json
│   │   │   └── schemas/
│   │   │       └── posts.schema.json
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

## 📌 Benefícios da Arquitetura

| Benefício | Descrição |
|-----------|-----------|
| 🔄 **Reaproveitamento** | Classes base e helpers usados em múltiplos testes |
| 📦 **Manutenção** | Alterações centralizadas em um único lugar |
| 🎯 **Separação** | Responsabilidades bem definidas entre camadas |
| 📊 **Validação** | Schemas JSON para contratos de API |
| 🔧 **Extensibilidade** | Adição de novas APIs de forma simples |
| 🧪 **Qualidade** | Factory pattern para dados consistentes |
| 📈 **Performance** | Configurações otimizadas de requisições |

---

## 📌 Considerações Finais

- **API Tests:** Arquitetura escalável com Service Layer, Factory Pattern e Assertions centralizados
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

