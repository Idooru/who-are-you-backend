import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CookieOptions } from "express";

@Injectable()
export class SecurityLibrary {
  constructor(private readonly configService: ConfigService) {}

  private readonly _cookieOption: CookieOptions = {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now() + 1000000),
  };

  public get cookieOption(): CookieOptions {
    return this._cookieOption;
  }
}
