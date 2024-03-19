import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  executor: 'ramping-arrival-rate',
  
  stages: [
    { duration: '10s', target: 20 } // Inicie com 0 VUs e aumente para 20 VUs em 10 segundos
  ],
  duration: "30s",
};

export default () => {
  const res = http.get("http://localhost:3000/usuarios", {
    tags: { test_name: "Spike test: Listar usuários"}
  });

  if (
    !check(res, {
      "Status code should be 200": (r) => r.status === 200,
    })
  ) {
    fail(`status code was *not* 200, received: ${res.status}`);
  }

  check(res, {
    "GET response time is acceptable": (r) => r.timings.duration < 300,
  });

  sleep(1);
};