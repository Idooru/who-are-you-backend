import { Module } from "@nestjs/common";
import * as process from "process";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

const isNodeEnvDev = (): boolean => process.env.NODE_ENV === "dev";
const isNodeEnvProd = (): boolean => process.env.NODE_ENV === "prod";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService): TypeOrmModuleOptions {
        return {
          type: "mysql",
          host: configService.get("DB_HOST"),
          port: configService.get("DB_PORT"),
          username: configService.get("DB_USERNAME"),
          password: configService.get("DB_PASSWORD"),
          database: configService.get("DB_SCHEMA"),
          entities: [],
          synchronize: isNodeEnvDev(),
          migrationsRun: isNodeEnvProd(),
          logging: isNodeEnvDev(),
          dropSchema: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class TypeormAdaptModule {}
