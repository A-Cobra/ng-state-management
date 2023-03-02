import { Module } from "@nestjs/common";
import { DBConfigService } from "./database-config.service";

@Module({
    providers: [DBConfigService],
    exports: [DBConfigService],
})
export class DBModule {}