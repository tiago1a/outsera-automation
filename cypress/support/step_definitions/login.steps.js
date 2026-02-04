import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../support/e2e/pages/LoginPage";
import { ERROR_MESSAGES } from "../../support/e2e/constants/Messages";

const loginPage = new LoginPage();

// ============================================
// GIVEN - Pré-condições
// ============================================

Given("que estou na página de login", () => {
  loginPage.visit().verifyOnLoginPage();
});

Given("que estou logado com usuário {string}", (userType) => {
  loginPage.visit();
  loginPage.loginWithFixture(userType);
});

// ============================================
// WHEN - Ações de Login
// ============================================

When("informo usuário e senha válidos", () => {
  loginPage.loginWithFixture("standard");
});

When("informo usuário {string} e senha {string}", (username, password) => {
  loginPage.login(username, password);
});

When("informo usuário válido e senha inválida", () => {
  loginPage.loginWithFixture("invalid_password");
});

When("tento realizar login sem preencher os campos", () => {
  loginPage.submitEmptyForm();
});

// ============================================
// THEN - Validações
// ============================================

Then("devo ser redirecionado para a página de produtos", () => {
  cy.url().should("include", "/inventory");
});

Then("devo visualizar uma mensagem de erro", () => {
  loginPage.verifyErrorMessage(ERROR_MESSAGES.INVALID_CREDENTIALS);
});

Then("devo visualizar a mensagem {string}", (message) => {
  cy.contains("[data-test='error']", message).should("be.visible");
});

Then("devo visualizar a mensagem de erro de login obrigatório", () => {
  loginPage.verifyErrorMessage(ERROR_MESSAGES.USERNAME_REQUIRED);
});
