@checkout
Feature: Checkout de compra
  Como um usuário da aplicação
  Quero finalizar minha compra
  Para completar o processo de compra

  Scenario: Finalizar compra com dados válidos
    Given que estou logado com usuário "standard"
    And estou na página de checkout com dados válidos
    When finalizo a compra
    Then a compra deve ser finalizada com sucesso
