import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CheckoutPage from "../../support/e2e/pages/CheckoutPage";
import ProductsPage from "../../support/e2e/pages/ProductsPage";
import AssertionHelper from "../../support/e2e/helpers/AssertionHelper";

const productsPage = new ProductsPage();
const checkoutPage = new CheckoutPage();

// ============================================
// GIVEN - Pré-condições
// ============================================

Given("estou na página de checkout", () => {
  productsPage.ensureProductInCart("sauce-labs-backpack");
  productsPage.clickCartIcon();
  checkoutPage.clickCheckout();
});

Given("estou na página de checkout com dados válidos", () => {
  productsPage.ensureProductInCart("sauce-labs-backpack");
  productsPage.clickCartIcon();
  checkoutPage.clickCheckout();
  checkoutPage.fillCheckoutWithFixture("valid");
});

Given("adiciono um produto ao carrinho", () => {
  productsPage.ensureProductInCart("sauce-labs-backpack");
});

// ============================================
// WHEN - Ações de Checkout
// ============================================

When("preencho os dados de checkout com dados válidos", () => {
  checkoutPage.fillCheckoutWithFixture("valid");
});

When("preencho os dados de checkout com dados inválidos", () => {
  checkoutPage.fillCheckoutWithFixture("invalid");
});

When("preencho apenas nome e sobrenome", () => {
  checkoutPage.fillCheckoutWithFixture("partial");
});

When("clico em continue", () => {
  checkoutPage.clickContinue();
});

When("finalizo a compra", () => {
  checkoutPage.clickFinish();
});

// ============================================
// THEN - Validações
// ============================================

Then("a compra deve ser finalizada com sucesso", () => {
  checkoutPage.verifyCheckoutComplete();
});

Then("devo visualizar a mensagem de erro de checkout obrigatório", () => {
  AssertionHelper.verifyErrorMessage(
    "[data-test='error']",
    "Error: First Name is required"
  );
});

Then("devo visualizar a mensagem de erro de postal code obrigatório", () => {
  AssertionHelper.verifyErrorMessage(
    "[data-test='error']",
    "Error: Postal Code is required"
  );
});
