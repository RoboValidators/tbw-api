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

  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    // TODO modify
    return this.health.check([() => this.dns.pingCheck("localhost", "http://localhost:3000/ping")]);
  }
}
