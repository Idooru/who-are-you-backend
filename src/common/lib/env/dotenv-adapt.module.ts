import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as process from "process";

const returnEnviromentPath = () => {
  switch (process.env.NODE_ENV) {
    case "dev":
      return "dev";
    case "prod":
      return "prod";
    case "test":
      return "test";
  }
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${returnEnviromentPath()}`,
    }),
  ],
})
export class DotenvAdaptModule {}
