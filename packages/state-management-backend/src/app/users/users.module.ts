import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BusinessModule } from '../business/business.module';
import { RoleController } from './controllers/roles.controller';
import { RolesService } from './services/role.service';
import { UsersDirectoryService } from './services/users-directory.service';
import { UserCredentials } from './entities/user-credentials.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User, UserCredentials]), BusinessModule],
  controllers: [UsersController, RoleController],
  providers: [RolesService, UsersDirectoryService],
  exports: [UsersDirectoryService],
})
export class UsersModule {}
