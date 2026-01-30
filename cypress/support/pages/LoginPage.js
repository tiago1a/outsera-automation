export class LoginPage {
  
  // Seletores
  usernameField = '#user-name'
  passwordField = '#password'
  loginButton   = '#login-button'
  errorMessage  = '[data-test="error"]'

  // Ações
  visit() {
    cy.visit('https://www.saucedemo.com/')
  }

  fillUsername(username) {
    cy.get(this.usernameField).type(username)
  }

  fillPassword(password) {
    cy.get(this.passwordField).type(password)
  }

  clickLogin() {
    cy.get(this.loginButton).click()
  }

  // Novo método: login completo
  login(username, password) {
    if (username) cy.get(this.usernameField).type(username)
    if (password) cy.get(this.passwordField).type(password)
    cy.get(this.loginButton).click()
  }

  // Novo método: submit sem preencher
  submit() {
    cy.get(this.loginButton).click()
  }

  // Método para pegar a mensagem de erro
  getErrorMessage() {
    return cy.get(this.errorMessage)
  }
}
