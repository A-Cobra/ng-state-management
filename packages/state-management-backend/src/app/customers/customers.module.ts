import { Module } from '@nestjs/common';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Customer } from './entities/customer.entity';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MikroOrmModule.forFeature([Customer]), UsersModule, AuthModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
