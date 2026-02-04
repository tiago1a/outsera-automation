@checkout
Feature: Checkout de compra
  Como um usuário da aplicação
  Quero finalizar minha compra
  Para completar o processo de compra

  @positive
  Scenario: Finalizar compra com dados válidos
    Given que estou logado com usuário "standard"
    And adiciono um produto ao carrinho
    And estou na página de checkout
    When preencho os dados de checkout com dados válidos
    And clico em continue
    And finalizo a compra
    Then a compra deve ser finalizada com sucesso

  @negative @validation
  Scenario: Checkout com campos obrigatórios em branco
    Given que estou logado com usuário "standard"
    And adiciono um produto ao carrinho
    And estou na página de checkout
    When preencho os dados de checkout com dados inválidos
    And clico em continue
    Then devo visualizar a mensagem de erro de checkout obrigatório

  @negative @validation
  Scenario: Checkout com postal code vazio
    Given que estou logado com usuário "standard"
    And adiciono um produto ao carrinho
    And estou na página de checkout
    When preencho apenas nome e sobrenome
    And clico em continue
    Then devo visualizar a mensagem de erro de postal code obrigatório
