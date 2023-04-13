import { Module } from '@nestjs/common';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
