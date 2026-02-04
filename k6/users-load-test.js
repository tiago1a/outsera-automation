import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

export const options = {
  vus: 500,              // 500 usuários simultâneos
  duration: '5m',        // por 5 minutos

  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% das requisições abaixo de 1s
    http_req_failed: ['rate<0.01'],    // menos de 1% de erro
  },
};

const responseTime = new Trend('response_time');

export default function () {
  const res = http.get('https://reqres.in/api/users?page=2');

  responseTime.add(res.timings.duration);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 1s': (r) => r.timings.duration < 1000,
  });

  sleep(1);
}
