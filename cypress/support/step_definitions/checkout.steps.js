import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../pages/LoginPage";
import { CheckoutPage } from "../pages/CheckoutPage";

const loginPage = new LoginPage();
const checkoutPage = new CheckoutPage();

// Cenário comum: estar logado
Given("que estou logado na aplicação", () => {
    loginPage.visit();
    loginPage.login("standard_user", "secret_sauce");
    cy.url().should("include", "inventory.html");
});

// Adicionar produto ao carrinho
Given("adiciono um produto ao carrinho", () => {
  checkoutPage.addProductToCart();
  checkoutPage.startCheckout();
});

// Cenário positivo: dados válidos
When("preencho os dados de pagamento corretamente", () => {
  checkoutPage.fillCheckoutData("Tiago", "QA", "12345");
  checkoutPage.finishCheckout();
});

Then("a compra deve ser finalizada com sucesso", () => {
  checkoutPage.getSuccessMessage().should("contain.text", "Thank you for your order!");
});

// Cenário negativo: dados inválidos
When("tento finalizar a compra com dados inválidos", () => {
  // Exemplo: não preencher nada
  checkoutPage.fillCheckoutData("", "", "");
});

Then("devo visualizar uma mensagem de erro no checkout", () => {
  checkoutPage.getErrorMessage().should("be.visible");
});
