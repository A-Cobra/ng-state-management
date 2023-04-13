import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RoleController } from './controllers/roles.controller';
import { RolesService } from './services/role.service';
import { UsersDirectoryService } from './services/users-directory.service';
import { UserCredentials } from './entities/user-credentials.entity';
import { Role } from './entities/role.entity';
import { CustomersModule } from '../customers/customers.module';
import { BusinessModule } from '../business/business.module';
import { UsersService } from './services/users.service';
import { UsersListener } from './events/users.listener';

@Module({
  imports: [
    MikroOrmModule.forFeature([UserCredentials, Role]),
    BusinessModule,
    CustomersModule,
  ],
  controllers: [UsersController, RoleController],
  providers: [RolesService, UsersDirectoryService, UsersService, UsersListener],
  exports: [UsersDirectoryService],
})
export class UsersModule {}
