import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { ValidRoles } from '../../auth/interfaces/valid-roles.type';
import { Authorized } from '../../auth/decorator/authorized.decorator';
import { GetUser } from '../../auth/decorator/get-user.decorator';
import { JwtInfo } from '../../auth/interfaces/jwtinfo.type';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SearchQueryDto } from '../dto/search-query.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @Authorized(ValidRoles.admin)
  @ApiQuery({ type: [SearchQueryDto] })
  findAll(@Query() searchQuery: SearchQueryDto) {
    return this.customersService.findAll(searchQuery);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() currentCustomer: JwtInfo
  ) {
    return this.customersService.findOne(id, currentCustomer);
  }

  @Patch(':id')
  @Authorized(ValidRoles.admin, ValidRoles.customer)
  @ApiBody({
    type: CreateCustomerDto,
    required: false,
    description: 'email and password cannot be modified',
  })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @GetUser() currentCustomer: JwtInfo
  ) {
    return this.customersService.update(id, updateCustomerDto, currentCustomer);
  }

  @Delete(':id')
  @Authorized(ValidRoles.admin)
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
