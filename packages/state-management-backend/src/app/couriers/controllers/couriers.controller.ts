import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CouriersService } from '../services/couriers.service';
import { CreateCourierDto } from '../dto/create-courier.dto';
import { UpdateCourierDto } from '../dto/update-courier.dto';
import { SearchQueryDto } from '../../customers/dto/search-query.dto';
import { Authorized } from '../../auth/decorator/authorized.decorator';
import { ValidRoles } from '../../auth/interfaces/valid-roles.type';
import { GetUser } from '../../auth/decorator/get-user.decorator';
import { JwtInfo } from '../../auth/interfaces/jwtinfo.type';

@Controller('couriers')
export class CouriersController {
  constructor(private readonly couriersService: CouriersService) {}

  @Post()
  create(@Body() createCourierDto: CreateCourierDto) {
    return this.couriersService.create(createCourierDto);
  }

  @Get()
  @Authorized(ValidRoles.admin)
  findAll(@Query() searchQueryDto: SearchQueryDto) {
    return this.couriersService.findAll(searchQueryDto);
  }

  @Get(':id')
  @Authorized()
  findOne(@Param('id') id: string, @GetUser() currentCourier: JwtInfo) {
    return this.couriersService.findOne(id, currentCourier);
  }

  @Patch(':id')
  @Authorized(ValidRoles.admin, ValidRoles.courier)
  update(
    @Param('id') id: string,
    @Body() updateCourierDto: UpdateCourierDto,
    @GetUser() currentCourier: JwtInfo
  ) {
    return this.couriersService.update(id, updateCourierDto, currentCourier);
  }

  @Delete(':id')
  @Authorized(ValidRoles.admin)
  remove(@Param('id') id: string) {
    return this.couriersService.remove(id);
  }
}
