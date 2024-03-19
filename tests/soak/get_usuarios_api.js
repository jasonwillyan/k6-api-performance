import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  executor: "constant-arrival-rate", // Mantém uma carga constante de 10 VUs ao longo do teste
  vus: 10,
  duration: "5m",
};

export default () => {
  const res = http.get("http://localhost:3000/usuarios", {
    tags: { test_name: "Soak test: Listar usuários" },
  });

  if (
    !check(res, {
      "Status code should be 200": (r) => r.status === 200,
    })
  ) {
    fail(`status code was *not* 200, received: ${res.status}`);
  }

  check(res, {
    "GET response time is acceptable": (r) => r.timings.duration < 500,
  });

  sleep(1);
};
