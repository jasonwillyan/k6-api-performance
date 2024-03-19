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

- Run a specific test


k6 run root/folder/file.spec.js

- Exemplo

```
k6 run load/get_usuarios.js
```

### Tipos de testes 

#### Teste Soak

Este teste avalia o comportamento do sistema sob carga sustentada por um período prolongado.

- **Usuários Virtuais (VUs)**: 10
- **Duração do Teste**: 5 minutos
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
