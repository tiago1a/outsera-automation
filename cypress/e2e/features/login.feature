Feature: Login na aplicação

  Como um usuário da aplicação
  Quero realizar login
  Para acessar páginas restritas

  Scenario: Login com credenciais válidas
    Given que estou na página de login
    When informo usuário e senha válidos
    Then devo ser redirecionado para a página de produtos

  Scenario: Login com senha inválida
    Given que estou na página de login
    When informo usuário válido e senha inválida
    Then devo visualizar uma mensagem de erro

  Scenario: Login com campos obrigatórios em branco
    Given que estou na página de login
    When tento realizar login sem preencher os campos
    Then devo visualizar uma mensagem de erro
