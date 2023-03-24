import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
import { PrismaService } from '../../database/services/prisma.service';
import { EntityRepository } from '@mikro-orm/core';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'UserRepository',
          useClass: EntityRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
