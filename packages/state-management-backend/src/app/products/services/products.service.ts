import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/services/prisma.service';

Injectable();
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
}
