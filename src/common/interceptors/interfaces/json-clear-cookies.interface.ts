import { HttpStatus } from "@nestjs/common";

export interface JsonClearCookiesInterface {
  statusCode: HttpStatus;
  message: string;
  cookieKey: string[];
}
