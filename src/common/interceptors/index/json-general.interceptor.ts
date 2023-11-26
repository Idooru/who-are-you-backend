import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map, Observable } from "rxjs";
import { TimeLoggerLibrary } from "../../lib/log/time-logger.library";
import { Request, Response } from "express";
import { JsonGeneralInterface } from "../interfaces/json-general.interface";

@Injectable()
export class JsonGeneralInterceptor<T> implements NestInterceptor {
  constructor(private readonly timeLoggerLibrary: TimeLoggerLibrary) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    this.timeLoggerLibrary.receiveRequest(req);

    return next.handle().pipe(
      map((data: JsonGeneralInterface<T>) => {
        this.timeLoggerLibrary.sendResponse(req);

        res
          .status(data.statusCode)
          .setHeader("X-Powered-By", "")
          .json({ success: true, ...data });
      }),
    );
  }
}
