# Testes de Carga com K6

Este diretório contém testes de carga utilizando a ferramenta K6, com o objetivo de avaliar o comportamento de APIs sob alto volume de acessos simultâneos.

## Cenário testado
- API pública: https://reqres.in
- Endpoint: GET /api/users
- Usuários simultâneos: 500
- Duração: 5 minutos

## Execução
```bash
k6 run users-load-test.js
