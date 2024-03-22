<h1 align="left"> Testes de Carga </h1>

### Introdução

Este repositório contém testes de carga para avaliar o desempenho de um servidor usando o framework k6.

#### Tools and Resources Used

- **K6**: Uma ferramenta de teste de carga.
- **ServeRest**: [Free REST API](https://serverest.dev/) O ServeRest é uma API REST gratuita que simula uma loja virtual.

#### Iniciando a API ServeRest

Para iniciar a API ServeRest localmente, você pode usar o seguinte comando:

```
npx serverest@latest
```

⚠️ Certifique-se de que o servidor está em execução antes de executar os testes de carga.

#### Executando Load Tests:

- Executando um teste específico

```
k6 run root/folder/file.spec.js
```

❗Substitua root/folder/file.spec.js pelo caminho do arquivo de teste que deseja executar.

- Exemplo

```
k6 run load/get_usuarios_api.js
```

- Executando Todos os Testes de Carga

Você também pode executar todos os testes de carga de uma vez usando o script Bash run_tests.sh. Para isso, siga as instruções abaixo:

1. Navegue até arquivo `run_tests.sh`
2. Torne o arquivo executável usando o comando `chmod +x run_tests.sh`
3. Execute o script usando o comando `./run_tests.sh`

### Tipos de testes

#### Teste Soak

Este teste avalia o comportamento do sistema sob carga sustentada por um período prolongado.

- **Usuários Virtuais (VUs)**: 25
- **Duração do Teste**: 1 minuto
- **Tempo de Resposta Aceitável**: Menos de 500ms

#### Teste Spike

Este teste avalia o comportamento do sistema sob uma carga repentina e significativa.

- **Usuários Virtuais (VUs)**: 20
- **Duração do Teste**: 30 segundos
- **Tempo de Resposta Aceitável**: Menos de 300ms

#### Teste Load

O teste de carga avalia o comportamento do sistema sob uma carga normal, simulando o uso típico.

- **Usuários Virtuais (VUs)**: Aumenta gradualmente de 1 para 5 em 1 segundo, mantém 10 por 2 segundos e, em seguida, reduz para 0 em 1 segundo.
- **Duração do Teste**: 4 segundos
- **Tempo de Resposta Aceitável**: 90% das requisições devem responder em menos de 300ms

#### Teste de Stress

O teste de stress avalia o comportamento do sistema sob uma carga pesada, simulando condições extremas de uso.

- **Usuários Virtuais (VUs)**: 10, 20, 30, 40 (aumento gradual)
- **Duração do Teste**: Aumenta de 2 a 10 segundos
- **Tempo de Resposta Aceitável**: 95% das requisições devem responder em menos de 600ms

## Resultados

| Tipo de teste | Endpoint     | Checks   | http_req_duration | http_req_failed | iteration | vus/max_vus |
| ------------- | ------------ | -------- | ----------------- | --------------- | --------- | ----------- |
| Smoke         | GET usuarios | 100.00%  | 3.54ms            | 0.00%           | 30        | 3/3         |
| Load          | GET usuarios | 100.00%  | 1.87ms            | 0.00%           | 27        | 7/10        |
| Stress        | GET usuarios | 100.00%  | 1.73ms            | 0.00%           | 869       | 40/40       |
| Spike         | GET usuarios | 100.00%  | 1.52ms            | 0.00%           | 307       | 19/20       |
| Soak          | GET usuarios | 100.00%  | 7.49ms            | 0.00%           | 1500      | 25/25       |
