import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@Controller({
  path: 'orders',
  version: '1',
})
export class OrdersController {
  constructor() {}
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return 'Hello from get all';
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'Hello from specific' + id;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@Body() order: any) {
    return 'created new order';
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOrder(@Body() order: any) {
    return 'order updated';
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() body: any) {
    return 'order patched';
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/orderstatus')
  updateStatus(@Param('id') id: string) {
    return 'order status updated';
  }
}
