/**
 * Helper para assertions customizados E2E
 * Centraliza validações para melhor manutenção
 */
class AssertionHelper {
  /**
   * Verifica URL atual contém texto esperado
   */
  static shouldContainUrl(text) {
    cy.url().should("include", text);
  }

  /**
   * Verifica URL atual é exatamente igual
   */
  static shouldEqualUrl(url) {
    cy.url().should("eq", `${Cypress.config("baseUrl")}/${url}`);
  }

  /**
   * Verifica que elemento está visível
   */
  static shouldBeVisible(selector) {
    cy.get(selector).should("be.visible");
  }

  /**
   * Verifica que elemento contém texto
   */
  static shouldContainText(selector, text) {
    cy.get(selector).should("contain.text", text);
  }

  /**
   * Verifica que elemento tem texto exato
   */
  static shouldHaveExactText(selector, text) {
    cy.get(selector).should("have.text", text);
  }

  /**
   * Verifica que elemento não está visível
   */
  static shouldNotBeVisible(selector) {
    cy.get(selector).should("not.be.visible");
  }

  /**
   * Verifica que elemento existe no DOM
   */
  static shouldExist(selector) {
    cy.get(selector).should("exist");
  }

  /**
   * Verifica que elemento está habilitado
   */
  static shouldBeEnabled(selector) {
    cy.get(selector).should("not.be.disabled");
  }

  /**
   * Verifica que elemento está desabilitado
   */
  static shouldBeDisabled(selector) {
    cy.get(selector).should("be.disabled");
  }

  /**
   * Verifica valor de atributo
   */
  static shouldHaveAttr(selector, attr, value) {
    cy.get(selector).should("have.attr", attr, value);
  }

  /**
   * Verifica quantidade de elementos
   */
  static shouldHaveLength(selector, length) {
    cy.get(selector).should("have.length", length);
  }

  /**
   * Verifica URL após navegação
   */
  static verifyNavigation(expectedUrl) {
    this.shouldContainUrl(expectedUrl);
  }

  /**
   * Verifica mensagem de erro
   */
  static verifyErrorMessage(selector, expectedMessage) {
    this.shouldBeVisible(selector);
    this.shouldContainText(selector, expectedMessage);
  }

  /**
   * Verifica mensagem de sucesso
   */
  static verifySuccessMessage(selector, expectedMessage) {
    this.shouldBeVisible(selector);
    this.shouldContainText(selector, expectedMessage);
  }
}

export default AssertionHelper;

