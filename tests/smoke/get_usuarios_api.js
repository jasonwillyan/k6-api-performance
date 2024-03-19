import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 3,
  duration: "10s",
};

export default () => {
  const res = http.get("http://localhost:3000/usuarios", {
    tags: { test_name: "Smoke test: Listar usuários"}
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
};
