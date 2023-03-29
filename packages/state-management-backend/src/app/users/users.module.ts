import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { DBModule } from '../database/database.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RoleController } from './controllers/roles.controller';
import { RolesService } from './services/role.service';

@Module({
  imports: [DBModule, MikroOrmModule.forFeature([User])],
  controllers: [UsersController, RoleController],
  providers: [UsersService, RolesService],
  exports: [UsersService],
})
export class UsersModule {}
