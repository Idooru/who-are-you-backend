import {
  ArgumentsHost,
  CallHandler,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map, Observable } from "rxjs";
import { Request, Response } from "express";
import { TimeLoggerLibrary } from "../../lib/log/time-logger.library";
import { JsonClearCookiesInterface } from "../interfaces/json-clear-cookies.interface";

@Injectable()
export class JsonClearCookiesInterceptor implements NestInterceptor {
  constructor(private readonly timeLoggerLibrary: TimeLoggerLibrary) {}

  intercept(context: ArgumentsHost, next: CallHandler<any>): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    this.timeLoggerLibrary.receiveRequest(req);

    return next.handle().pipe(
      map((data: JsonClearCookiesInterface) => {
        const { statusCode, message, cookieKey } = data;
        this.timeLoggerLibrary.sendResponse(req);

        if (cookieKey.length >= 2) {
          cookieKey.forEach((idx: string) => res.clearCookie(idx));
        } else {
          res.clearCookie(cookieKey[0]);
        }

        res.status(data.statusCode).setHeader("X-Powered-By", "");

        return { success: true, ...{ statusCode, message } };
      }),
    );
  }
}
