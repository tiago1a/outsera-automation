export class CheckoutPage {

  // Seletores
  addToCartButton = '[data-test="add-to-cart-sauce-labs-backpack"]'
  cartIcon        = '.shopping_cart_link'
  checkoutButton  = '[data-test="checkout"]'
  firstNameField  = '[data-test="firstName"]'
  lastNameField   = '[data-test="lastName"]'
  postalCodeField = '[data-test="postalCode"]'
  continueButton  = '[data-test="continue"]'
  finishButton    = '[data-test="finish"]'
  successMessage  = '.complete-header'
  errorMessage    = '[data-test="error"]'

  // Ações
    addProductToCart(product = "sauce-labs-backpack") {
    cy.get(`[data-test="add-to-cart-${product}"]`, { timeout: 10000 }).click();
    cy.get(this.cartIcon).click();
}


  startCheckout() {
    cy.get(this.checkoutButton).click()
  }

  fillCheckoutData(firstName, lastName, postalCode) {
    if (firstName) cy.get(this.firstNameField).type(firstName)
    if (lastName) cy.get(this.lastNameField).type(lastName)
    if (postalCode) cy.get(this.postalCodeField).type(postalCode)
    cy.get(this.continueButton).click()
  }

  finishCheckout() {
    cy.get(this.finishButton).click()
  }

  getSuccessMessage() {
    return cy.get(this.successMessage)
  }

  getErrorMessage() {
    return cy.get(this.errorMessage)
  }
}
