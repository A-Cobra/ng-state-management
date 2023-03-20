import { Injectable } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';

Injectable();
export class ProductsService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager
  ) {}

  getReviews({ page, limit, productId }) {}
}
