import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { LibraryModule } from "./common/lib/library.module";

@Module({
  imports: [LibraryModule],
  controllers: [AppController],
})
export class AppModule {}
