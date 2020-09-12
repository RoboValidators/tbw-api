import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log(new ConfigService().get("API_KEY"));
    console.log(request.query);
    if (request.query.api === new ConfigService().get("API_KEY")) {
      return true;
    }

    return false;
  }
}
