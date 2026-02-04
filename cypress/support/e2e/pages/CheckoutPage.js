/**
 * Page Object para Checkout
 * Contém seletores e métodos para operações de checkout
 */
import AssertionHelper from "../helpers/AssertionHelper";
import { ERROR_MESSAGES, SUCCESS_MESSAGES, PAGE_TITLES, URLs } from "../constants/Messages";

class CheckoutPage {
  // Seletores
  elements = {
    // Cart Page
    cartItems: ".cart_item",
    cartItemNames: ".inventory_item_name",
    cartItemPrices: ".inventory_item_price",
    continueShoppingButton: "[data-test='continue-shopping']",
    checkoutButton: "[data-test='checkout']",

    // Checkout Step One
    firstNameField: "[data-test='firstName']",
    lastNameField: "[data-test='lastName']",
    postalCodeField: "[data-test='postalCode']",
    continueButton: "[data-test='continue']",
    cancelButton: "[data-test='cancel']",
    errorMessage: "[data-test='error']",

    // Checkout Step Two
    paymentInfo: ".summary_value",
    shippingInfo: ".summary_value",
    itemTotal: ".summary_subtotal_label",
    tax: ".summary_tax_label",
    total: ".summary_total_label",
    finishButton: "[data-test='finish']",

    // Checkout Complete
    completeHeader: ".complete-header",
    completeText: ".complete-text",
    backHomeButton: "[data-test='back-to-products']",
  };

  /**
   * Verifica que está no carrinho
   */
  verifyOnCartPage() {
    AssertionHelper.shouldExist(this.elements.checkoutButton);
    return this;
  }

  /**
   * Verifica itens no carrinho
   */
  verifyCartItems(count) {
    AssertionHelper.shouldHaveLength(this.elements.cartItems, count);
    return this;
  }

  /**
   * Continua comprando
   */
  clickContinueShopping() {
    cy.get(this.elements.continueShoppingButton).click();
    return this;
  }

  /**
   * Inicia checkout
   */
  clickCheckout() {
    cy.get(this.elements.checkoutButton).click();
    return this;
  }

  /**
   * Preenche dados do checkout (Step One)
   */
  fillCheckoutData(firstName, lastName, postalCode) {
    if (firstName) {
      cy.get(this.elements.firstNameField).clear().type(firstName);
    }
    if (lastName) {
      cy.get(this.elements.lastNameField).clear().type(lastName);
    }
    if (postalCode) {
      cy.get(this.elements.postalCodeField).clear().type(postalCode);
    }
    return this;
  }

  /**
   * Preenche dados do checkout com fixture
   */
  fillCheckoutWithFixture(checkoutType) {
    cy.fixture("products").then((products) => {
      const data = products.checkout[checkoutType];
      if (data) {
        this.fillCheckoutData(data.firstName, data.lastName, data.postalCode);
      }
    });
    return this;
  }

  /**
   * Continua para Step Two
   */
  clickContinue() {
    cy.get(this.elements.continueButton).click();
    return this;
  }

  /**
   * Cancela checkout
   */
  clickCancel() {
    cy.get(this.elements.cancelButton).click();
    return this;
  }

  /**
   * Verifica que está no Step One
   */
  verifyOnStepOne() {
    AssertionHelper.shouldExist(this.elements.firstNameField);
    AssertionHelper.shouldExist(this.elements.lastNameField);
    AssertionHelper.shouldExist(this.elements.postalCodeField);
    return this;
  }

  /**
   * Verifica erro de validação
   */
  verifyValidationError() {
    AssertionHelper.verifyErrorMessage(
      this.elements.errorMessage,
      ERROR_MESSAGES.REQUIRED_FIELD
    );
    return this;
  }

  /**
   * Verifica que está no Step Two (Overview)
   */
  verifyOnStepTwo() {
    AssertionHelper.shouldExist(this.elements.itemTotal);
    AssertionHelper.shouldExist(this.elements.tax);
    AssertionHelper.shouldExist(this.elements.total);
    AssertionHelper.shouldExist(this.elements.finishButton);
    return this;
  }

  /**
   * Finaliza compra
   */
  clickFinish() {
    cy.get(this.elements.finishButton).click();
    return this;
  }

  /**
   * Verifica que checkout foi concluído
   */
  verifyCheckoutComplete() {
    AssertionHelper.shouldExist(this.elements.completeHeader);
    AssertionHelper.shouldContainText(
      this.elements.completeHeader,
      SUCCESS_MESSAGES.ORDER_COMPLETE
    );
    return this;
  }

  /**
   * Volta para produtos
   */
  clickBackHome() {
    cy.get(this.elements.backHomeButton).click();
    return this;
  }

  /**
   * Remove item do carrinho pelo nome
   */
  removeItemByName(itemName) {
    cy.contains(".cart_item", itemName).find("[data-test^='remove']").click();
    return this;
  }

  /**
   * Verifica total de itens
   */
  verifyCartItemCount(expectedCount) {
    AssertionHelper.shouldHaveLength(this.elements.cartItems, expectedCount);
    return this;
  }

  /**
   * Calcula e verifica total
   */
  verifyTotalCalculation() {
    const prices = [];
    cy.get(this.elements.cartItemPrices).each(($el) => {
      prices.push(parseFloat($el.text().replace("$", "")));
    });

    const subtotal = prices.reduce((a, b) => a + b, 0);

    cy.get(this.elements.itemTotal).then(($el) => {
      const displayedSubtotal = parseFloat($el.text().replace("Item total: $", ""));
      expect(displayedSubtotal).to.closeTo(subtotal, 0.01);
    });

    return this;
  }
}

export default CheckoutPage;

