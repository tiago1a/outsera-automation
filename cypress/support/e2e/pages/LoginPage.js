/**
 * Page Object para Login
 * Contém seletores e métodos para operações de login
 */
import AssertionHelper from "../helpers/AssertionHelper";
import { ERROR_MESSAGES, PAGE_TITLES, URLs } from "../constants/Messages";

class LoginPage {
  // Seletores usando data-testid
  elements = {
    usernameField: '[data-test="username"]',
    passwordField: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    errorMessage: '[data-test="error"]',
    logo: '.login_logo',
    credentialsDivider: '.login_credentials-divider',
    socialLinks: '.social-links',
  };

  /**
   * Visita a página de login
   */
  visit() {
    cy.visit(URLs.LOGIN);
    AssertionHelper.shouldExist(this.elements.logo);
    return this;
  }

  /**
   * Preenche o campo de usuário
   */
  fillUsername(username) {
    cy.get(this.elements.usernameField).clear().type(username);
    return this;
  }

  /**
   * Preenche o campo de senha
   */
  fillPassword(password) {
    cy.get(this.elements.passwordField).clear().type(password);
    return this;
  }

  /**
   * Clica no botão de login
   */
  clickLogin() {
    cy.get(this.elements.loginButton).click();
    return this;
  }

  /**
   * Realiza login completo
   */
  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickLogin();
    return this;
  }

  /**
   * Realiza login com dados do fixture
   */
  loginWithFixture(userType) {
    cy.fixture("users").then((users) => {
      const user = users[userType];
      if (user) {
        this.fillUsername(user.username);
        this.fillPassword(user.password);
        this.clickLogin();
      }
    });
    return this;
  }

  /**
   * Submete formulário vazio
   */
  submitEmptyForm() {
    cy.get(this.elements.loginButton).click();
    return this;
  }

  /**
   * Verifica que está na página de login
   */
  verifyOnLoginPage() {
    AssertionHelper.shouldExist(this.elements.usernameField);
    AssertionHelper.shouldExist(this.elements.passwordField);
    AssertionHelper.shouldExist(this.elements.loginButton);
    return this;
  }

  /**
   * Verifica mensagem de erro
   */
  verifyErrorMessage(expectedMessage) {
    AssertionHelper.verifyErrorMessage(
      this.elements.errorMessage,
      expectedMessage
    );
    return this;
  }

  /**
   * Verifica mensagem de erro para credenciais inválidas
   */
  verifyInvalidCredentials() {
    this.verifyErrorMessage(ERROR_MESSAGES.INVALID_CREDENTIALS);
    return this;
  }

  /**
   * Verifica mensagem de erro para usuário bloqueado
   */
  verifyLockedOutUser() {
    this.verifyErrorMessage(ERROR_MESSAGES.LOCKED_OUT_USER);
    return this;
  }

  /**
   * Verifica redirecionamento para página de produtos
   */
  verifyRedirectToInventory() {
    AssertionHelper.shouldContainUrl(URLs.INVENTORY);
    return this;
  }

  /**
   * Limpa campos do formulário
   */
  clearForm() {
    cy.get(this.elements.usernameField).clear();
    cy.get(this.elements.passwordField).clear();
    return this;
  }

  /**
   * Verifica credenciais divididas visíveis
   */
  verifyCredentialsInfo() {
    AssertionHelper.shouldExist(this.elements.credentialsDivider);
    AssertionHelper.shouldExist(this.elements.socialLinks);
    return this;
  }
}

export default LoginPage;

