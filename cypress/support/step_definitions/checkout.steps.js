import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CheckoutPage from "../../support/e2e/pages/CheckoutPage";
import LoginPage from "../../support/e2e/pages/LoginPage";
import ProductsPage from "../../support/e2e/pages/ProductsPage";

const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const checkoutPage = new CheckoutPage();

// ============================================
// GIVEN - Pré-condições
// ============================================

Given("estou na página de checkout com dados válidos", () => {
  loginPage.visit();
  loginPage.loginWithFixture("standard");
  productsPage.addProductToCart("sauce-labs-backpack");
  productsPage.clickCartIcon();
  checkoutPage.clickCheckout();
  checkoutPage.fillCheckoutWithFixture("valid");
  checkoutPage.clickContinue();
});

// ============================================
// WHEN - Ações de Checkout
// ============================================

When("finalizo a compra", () => {
  checkoutPage.clickFinish();
});

// ============================================
// THEN - Validações
// ============================================

Then("a compra deve ser finalizada com sucesso", () => {
  checkoutPage.verifyCheckoutComplete();
});
