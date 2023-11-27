import {
  ArgumentsHost,
  CallHandler,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map, Observable } from "rxjs";
import { SecurityLibrary } from "../../lib/security/security.library";
import { Request, Response } from "express";
import { TimeLoggerLibrary } from "src/common/lib/log/time-logger.library";
import { JsonJwtAuthInterface } from "../interfaces/json-jwt-auth.interface";

@Injectable()
export class JsonJwtAuthInterceptor implements NestInterceptor {
  constructor(
    private readonly timeLoggerLibrary: TimeLoggerLibrary,
    private readonly securityLibrary: SecurityLibrary,
  ) {}

  intercept(context: ArgumentsHost, next: CallHandler<any>): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const cookieOption = this.securityLibrary.cookieOption;

    this.timeLoggerLibrary.receiveRequest(req);

    return next.handle().pipe(
      map((data: JsonJwtAuthInterface) => {
        const { statusCode, message, cookieKey, cookieValue } = data;
        this.timeLoggerLibrary.sendResponse(req);

        for (let i = 0; i < 2; i++) {
          res.cookie(cookieKey[i], cookieValue[i], cookieOption);
        }

        res.status(data.statusCode).setHeader("X-Powered-By", "");
        return { success: true, ...{ statusCode, message } };
      }),
    );
  }
}
