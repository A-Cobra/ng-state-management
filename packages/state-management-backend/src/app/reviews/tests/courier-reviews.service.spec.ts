import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { Courier } from '../../couriers/entities/courier.entity';
import { CreateCourierReviewDto } from '../dto/create-courier-review.dto';
import { CourierReview } from '../entities/courier-review.entity';
import { Review } from '../entities/review.entity';
import { CourierReviewsService } from '../services/courier-review.service';
import { CouriersService } from '../../couriers/services/couriers.service';
import { Payroll } from '../../payroll/entities/payroll.entity';
import { Role } from '../../users/entities/role.entity';

describe('ReviewsService', () => {
  let courierReviewsService: CourierReviewsService;

  const mockReviewRepository = {
    find: jest.fn(),
    findAndCount: jest.fn(),
    create: jest.fn(),
    persistAndFlush: jest.fn(),
  };
  const mockCourierReviewRepository = {
    findAndCount: jest.fn(),
    create: jest.fn(),
    persistAndFlush: jest.fn(),
  };
  const mockCourierService = {
    findById: jest.fn(),
  };

  const mockCourier: Courier = {
    userId: 'courier-id',
    username: 'courier',
    email: 'email',
    name: 'Courier Name',
    contactNumber: '+50312345678',
    status: false,
    driversLicense: '123140128427',
    vehicle: null,
    courierId: '',
    payroll: new Payroll(),
    user: undefined,
    role: new Role(),
    password: '',
    isLoggedIn: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourierReviewsService,
        {
          provide: getRepositoryToken(Review),
          useValue: mockReviewRepository,
        },
        {
          provide: getRepositoryToken(CourierReview),
          useValue: mockCourierReviewRepository,
        },
        {
          provide: CouriersService,
          useValue: mockCourierService,
        },
      ],
    }).compile();

    courierReviewsService = module.get<CourierReviewsService>(
      CourierReviewsService
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getCourierReviews', () => {
    it('should return a paginated list of courier reviews', async () => {
      const mockCourierTwo: Courier = {
        userId: 'courier-id2',
        username: 'courier2',
        email: 'email2',
        name: 'Courier Name2',
        contactNumber: '+503123456782',
        status: false,
        driversLicense: '1231401284272',
        vehicle: null,
        courierId: '',
        payroll: new Payroll(),
        user: undefined,
        role: new Role(),
        password: '',
        isLoggedIn: false,
      };
      const limit = 2;
      const reviews: Review[] = [
        {
          reviewId: '1',
          comment: 'Great courier!',
          customerId: 'customer-id',
        },
        {
          reviewId: '2',
          comment: 'Fast delivery',
          customerId: 'customer-id',
        },
        {
          reviewId: '3',
          comment: 'Bad experience',
          customerId: 'customer-id',
        },
      ];
      const courierReviews: CourierReview[] = [
        {
          courierReviewId: '1',
          courier: mockCourier,
          review: reviews[0],
        },
        {
          courierReviewId: '2',
          courier: mockCourier,
          review: reviews[1],
        },
        {
          courierReviewId: '3',
          courier: mockCourierTwo,
          review: reviews[2],
        },
      ];

      mockCourierService.findById.mockResolvedValueOnce(mockCourier);

      mockCourierReviewRepository.findAndCount.mockResolvedValueOnce([
        courierReviews.filter((cr) => cr.courier.userId === mockCourier.userId),
        2,
      ]);
      mockReviewRepository.find.mockResolvedValueOnce([reviews[0], reviews[1]]);

      const result = await courierReviewsService.getCourierReviews(
        1,
        limit,
        mockCourier.userId
      );

      expect(mockCourierReviewRepository.findAndCount).toHaveBeenCalledWith(
        { courier: mockCourier },
        { offset: 0, limit: limit }
      );
      expect(mockReviewRepository.find).toHaveBeenCalledWith([
        reviews[0],
        reviews[1],
      ]);
      expect(result).toEqual({
        data: [reviews[0], reviews[1]],
        currentPage: 1,
        totalItems: 2,
        totalPages: 1,
      });
    });

    it('should return an empty list if there are no reviews for the courier', async () => {
      const page = 1;
      const limit = 10;
      const courierId = '1';

      mockCourierService.findById.mockResolvedValueOnce(mockCourier);
      mockCourierReviewRepository.findAndCount.mockResolvedValueOnce([[], 0]);
      mockReviewRepository.find.mockResolvedValueOnce([]);

      const result = await courierReviewsService.getCourierReviews(
        page,
        limit,
        courierId
      );

      expect(mockCourierReviewRepository.findAndCount).toBeCalledWith(
        { courier: mockCourier },
        { offset: 0, limit: 10 }
      );
      expect(result).toEqual({
        data: [],
        currentPage: page,
        totalItems: 0,
        totalPages: 0,
      });
    });
  });

  describe('createCourierReview', () => {
    it('should create a new courier review', async () => {
      const customerId = 'cusomter-id';
      const comment = 'Great service!';
      const createCourierReviewDto: CreateCourierReviewDto = {
        customerId,
        courierId: mockCourier.userId,
        comment,
      };

      const reviewId = 'review-id';
      const review = {
        reviewId,
        customerId,
        comment,
      };

      mockCourierService.findById.mockResolvedValueOnce(mockCourier);
      mockReviewRepository.create.mockReturnValueOnce(review);
      mockCourierReviewRepository.create.mockReturnValueOnce({
        mockCourier,
        review,
      });

      const result = await courierReviewsService.createCourierReview(
        createCourierReviewDto
      );

      expect(mockReviewRepository.create).toHaveBeenCalledWith(
        createCourierReviewDto
      );
      expect(mockCourierReviewRepository.create).toHaveBeenCalledWith({
        courier: mockCourier,
        review,
      });
      expect(mockReviewRepository.persistAndFlush).toHaveBeenCalledTimes(1);
      expect(mockCourierReviewRepository.persistAndFlush).toHaveBeenCalledTimes(
        1
      );
      expect(result).toEqual(review);
    });
  });
});
