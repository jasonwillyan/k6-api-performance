import http from "k6/http";
import { check, sleep, fail } from "k6";

export const options = {
  stages: [
    { target: 5, duration: "1s" }, // ramd-up -> aumento do tráfego de 1 para 5 usuários em 5 segundos.
    { target: 10, duration: "2s" }, // permanece em 10 usuários por 10 segundos.
    { target: 0, duration: "1s" }, // ramp-down -> redução gradual para 0 usuários.
  ],
  thresholds: {
    http_req_duration: ["p(90)<300"], // 95% das requisições devem responder em menos de 200ms
    http_req_failed: ["rate<0.01"], // 1% das requisições HTTP podem falhar
    my_custom_metric: ["rate<0.05"], // A taxa de erro da minha métrica personalizada deve estar abaixo de 5%
    "http_req_duration{type:staticContent}": ["p(99)<250"], // 99% das requisições HTTP para o conteúdo estático devem ser concluídas em menos de 250ms
  },
};

export default function () {
  const url = "http://localhost:3000/usuarios";

  const res = http.get(url, {
    tags: { test_name: "Listar usuários cadastrados", endpoint: "GET /usuarios" },
  });

  if (
    !check(res, {
      "Status code should be 200": (r) => r.status === 200,
    })
  ) {
    fail(`status code was *not* 200, received: ${res.status}`);
  }

  check(res, {
    "GET response time is fast": (r) => r.timings.duration < 200,
  });

  sleep(1);
}
