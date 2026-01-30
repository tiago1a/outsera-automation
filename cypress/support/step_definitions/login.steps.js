import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../pages/LoginPage";

const loginPage = new LoginPage();

// Cenário: acessar a página de login
Given("que estou na página de login", () => {
  loginPage.visit();
});

// Cenário positivo: login válido
When("informo usuário e senha válidos", () => {
  loginPage.login("standard_user", "secret_sauce");
});

// Cenário negativo: senha inválida
When("informo usuário válido e senha inválida", () => {
  loginPage.login("standard_user", "senha_invalida");
});

// Cenário negativo: campos vazios
When("tento realizar login sem preencher os campos", () => {
  loginPage.submit();
});

// Validação positiva: redirecionamento para inventory
Then("devo ser redirecionado para a página de produtos", () => {
  cy.url().should("include", "inventory");
});

// Validação negativa: mensagem de erro visível
Then("devo visualizar uma mensagem de erro", () => {
  loginPage.getErrorMessage().should("be.visible");
});
