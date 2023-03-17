import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/services/prisma.service';
import { Product } from '../entities/product.entity';

Injectable();
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }
}
