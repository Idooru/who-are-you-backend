import { Module } from "@nestjs/common";
import { TypeormAdaptModule } from "./database/typeorm-adapt.module";
import { DotenvAdaptModule } from "./env/dotenv-adapt.module";

@Module({
  imports: [TypeormAdaptModule, DotenvAdaptModule],
})
export class LibraryModule {}
