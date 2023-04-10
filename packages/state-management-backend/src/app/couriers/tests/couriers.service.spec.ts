import { Test, TestingModule } from '@nestjs/testing';
import { CouriersService } from '../services/couriers.service';

describe('CouriersService', () => {
  let service: CouriersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouriersService],
    }).compile();

    service = module.get<CouriersService>(CouriersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
