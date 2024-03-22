import http from "k6/http";
import { check, sleep, fail } from "k6";

export let options = {
  stages: [
    { target: 10, duration: "2s" },
    { target: 10, duration: "5s" },
    { target: 20, duration: "2s" },
    { target: 20, duration: "5s" },
    { target: 30, duration: "2s" },
    { target: 30, duration: "5s" },
    { target: 40, duration: "2s" },
    { target: 40, duration: "10s" },
  ],
  thresholds: {
    http_req_duration: ["p(95)<600"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  const res = http.get("http://localhost:3000/usuarios");

  if (
    !check(res, {
      "Status code should be 200": (r) => r.status === 200,
    })
  ) {
    fail(`status code was *not* 200, received: ${res.status}`);
  }

  check(res, {
    "GET response time is acceptable": (r) => r.timings.duration < 600,
  });
  
  sleep(1);
}
