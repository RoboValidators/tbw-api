import { Controller, Get } from "@nestjs/common";
import {
  HealthCheckService,
  HealthCheck,
  HealthCheckResult,
  DNSHealthIndicator
} from "@nestjs/terminus";

@Controller("health")
export default class HealthController {
  constructor(private health: HealthCheckService, private dns: DNSHealthIndicator) {}

  @Get("ping")
  ping(): string {
    return "pong";
  }

  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.dns.pingCheck("localhost", "http://localhost:3000/health/ping"),
      () => this.dns.pingCheck("firebase", "http://localhost:3000/simple")
    ]);
  }
}
