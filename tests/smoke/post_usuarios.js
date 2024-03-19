import http from "k6/http";
import { check, sleep, fail } from "k6";

export const options = {
  vus: 1,
  duration: "1s",
};

export default function () {
  const url = "http://localhost:3000/usuarios";

  const payload = JSON.stringify({
    nome: "qa test",
    email: "test0@qa.com.br",
    password: "qatest123",
    administrador: "true",
  });

  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, headers, {
    tags: { test_name: "Smoke test: Cadastrar usuário", endpoint: "POST /usuarios" },
  });

  console.log(JSON.parse(res.body)._id);

  if (
    !check(res, {
      "Status code should be 201": (r) => r.status === 201,
    })
  ) {
    fail(`status code was *not* 200, received: ${res.status}`);
  }

  check(res, {
    "GET response time is fast": (r) => r.timings.duration < 200,
  });

  sleep(1);
}
