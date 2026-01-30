# Testes Automatizados de API – Cypress

Este projeto contém testes automatizados de API desenvolvidos com **Cypress**, como parte de um desafio técnico.  
O objetivo é validar endpoints REST aplicando boas práticas de automação, organização de código e validações claras.

---

## 🧰 Tecnologias e Ferramentas

- **Node.js**
- **Cypress**
- **JavaScript**
- **JSONPlaceholder API**

---

## 🌐 API Utilizada

A API utilizada no projeto é:

🔗 https://jsonplaceholder.typicode.com

Para garantir confiabilidade, previsibilidade e continuidade do desafio, foi utilizada a **JSONPlaceholder**, uma API pública amplamente adotada para testes de integração e automação, com endpoints equivalentes.

---

### Execução dos testes de API

Os testes de API utilizam um arquivo de configuração dedicado (`cypress.api.config.js`).

```bash
npm run test:api
```
Relatório de Testes
Após a execução, é possível gerar um relatório HTML consolidado:
```bash
npm run report:merge
npm run report:generate
```
O relatório final estará disponível em:

cypress/reports/report.html
---

## 📁 Estrutura do Projeto

cypress/
├── e2e/
│ └── api/
│ └── posts.spec.js
├── support/
│ └── api/
│ └── JsonPlaceholderService.js

### 🔹 JsonPlaceholderService

Foi criada uma **camada de serviço** para centralizar as chamadas à API, trazendo benefícios como:
- reutilização de código
- melhor legibilidade
- manutenção facilitada
- separação de responsabilidades entre testes e requisições

---

## 🔧 Exemplo da Camada de Serviço

```js
export class JsonPlaceholderService {

  static getPosts() {
    return cy.request({
      method: "GET",
      url: "/posts",
    })
  }

  static getPostById(id) {
    return cy.request({
      method: "GET",
      url: `/posts/${id}`,
    })
  }

  static createPost(payload) {
    return cy.request({
      method: "POST",
      url: "/posts",
      body: payload,
    })
  }

  static updatePost(id, payload) {
    return cy.request({
      method: "PUT",
      url: `/posts/${id}`,
      body: payload,
    })
  }

  static deletePost(id) {
    return cy.request({
      method: "DELETE",
      url: `/posts/${id}`,
    })
  }
}
✅ Cenários de Teste Implementados

GET /posts

Validação do status code 200

Validação de retorno em formato de lista

GET /posts/{id}

Validação do status code 200

Validação dos campos do corpo da resposta

POST /posts

Validação do status code 201

Validação da estrutura do objeto criado

PUT /posts/{id}

Validação do status code 200

Validação dos campos atualizados

DELETE /posts/{id}

Validação do status code 200

⚠️ Observação:
A JSONPlaceholder é uma API simulada (fake API).
Portanto, as operações de POST, PUT e DELETE não persistem dados, e os testes validam apenas o comportamento da resposta, conforme esperado.

▶️ Como Executar o Projeto
1️⃣ Instalar as dependências
npm install

2️⃣ Executar os testes em modo headless
npx cypress run

3️⃣ Abrir o Cypress em modo interativo
npx cypress open

📌 Considerações Finais

O projeto segue uma arquitetura baseada em camada de serviço para chamadas de API.

As validações são realizadas diretamente nos testes, garantindo clareza e controle.

A solução foi pensada para ser simples, organizada e facilmente extensível.

O foco está na confiabilidade dos testes e na aplicação de boas práticas de automação.

👤 Autor

Tiago Amaro
QA / Automation Engineer

