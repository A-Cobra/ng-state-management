import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './database/services/prisma.service';
import { AuthModule } from './auth/auth.module';
import { getEnvPath } from './common/utils/env-path';
import { validate } from './common/utils/env-validate';
import { DBModule } from './database/database.module';
import { UsersModule } from './users/users.module';

const envFilePath = getEnvPath(process.env.WORKDIR);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      validate,
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    DBModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
