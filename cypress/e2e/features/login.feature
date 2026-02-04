@login @smoke
Feature: Login na aplicação
  Como um usuário da aplicação
  Quero realizar login
  Para acessar páginas restritas

  @positive
  Scenario: Login com credenciais válidas
    Given que estou na página de login
    When informo usuário e senha válidos
    Then devo ser redirecionado para a página de produtos

  @negative
  Scenario: Login com senha inválida
    Given que estou na página de login
    When informo usuário válido e senha inválida
    Then devo visualizar uma mensagem de erro

  @negative @validation
  Scenario: Login com campos obrigatórios em branco
    Given que estou na página de login
    When tento realizar login sem preencher os campos
    Then devo visualizar a mensagem de erro de campo obrigatório

  @positive
  Scenario: Login com usuário bloqueado
    Given que estou na página de login
    When informo usuário "locked_out" e senha "secret_sauce"
    Then devo visualizar uma mensagem de erro
