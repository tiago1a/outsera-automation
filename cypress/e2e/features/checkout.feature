Feature: Checkout de compra

  Background:
    Given que estou logado na aplicação
    And adiciono um produto ao carrinho

  Scenario: Finalizar compra com dados válidos
    When preencho os dados de pagamento corretamente
    Then a compra deve ser finalizada com sucesso

  Scenario: Finalizar compra com dados inválidos
    When tento finalizar a compra com dados inválidos
    Then devo visualizar uma mensagem de erro no checkout
