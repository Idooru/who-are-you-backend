import { HttpStatus } from "@nestjs/common";

export interface JsonSendCookiesInterface<T> {
  statusCode: HttpStatus;
  message: string;
  cookieKey: string;
  cookieValues: T[];
}
