import { Injectable, Logger } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class TimeLoggerLibrary {
  private readonly startLogger = new Logger("Start");
  private readonly endLogger = new Logger("End");
  private now = 0;

  public receiveRequest(req: Request) {
    this.startLogger.log(
      `Receive request from ${req.method} ${req.originalUrl}`,
    );
    this.now = Date.now();
  }

  public sendResponse(req: Request) {
    this.endLogger.log(
      `Send response from ${req.method} ${req.originalUrl} :: time taken : ${
        Date.now() - this.now
      }ms`,
    );
  }
}
