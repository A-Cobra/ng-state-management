import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BusinessModule } from '../business/business.module';
import { RoleController } from './controllers/roles.controller';
import { RolesService } from './services/role.service';
import { UsersDirectorysService } from './services/users-directory.service';

@Module({
  imports: [MikroOrmModule.forFeature([User]), BusinessModule],
  controllers: [UsersController, RoleController],
  providers: [UsersService, RolesService, UsersDirectorysService],
  exports: [UsersService, UsersDirectorysService],
})
export class UsersModule {}
