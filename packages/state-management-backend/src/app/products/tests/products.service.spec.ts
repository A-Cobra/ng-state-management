import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../services/products.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: EntityRepository<Product>;

  const mockProductRepository = {
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    persistAndFlush: jest.fn(),
    flush: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get(getRepositoryToken(Product));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAllProducts', () => {
    it('should return paginated data of products', async () => {
      const page = 1;
      const limit = 10;
      const productName = 'Product';

      const products = [
        { idProduct: '1', productName: 'Product 1' },
        { idProduct: '2', productName: 'Product 2' },
      ];
      const total = 2;

      mockProductRepository.findAndCount.mockReturnValue([products, total]);

      const result = await service.findAllProducts({
        page,
        limit,
        productName,
      });

      expect(result).toEqual({
        data: products,
        currentPage: page,
        totalItems: 2,
        totalPages: Math.ceil(total / limit),
      });
      expect(productRepository.findAndCount).toHaveBeenCalledWith(
        { productName: { $ilike: `%${productName}%` } },
        {
          offset: (page - 1) * limit,
          limit,
        }
      );
    });
  });

  describe('findOneProduct', () => {
    it('should return a product', async () => {
      const idProduct = '1';
      const product = { idProduct, productName: 'Product' };

      mockProductRepository.findOne.mockReturnValue(product);

      const result = await service.findOneProduct(idProduct);

      expect(result).toEqual(product);
      expect(productRepository.findOne).toHaveBeenCalledWith({ idProduct });
    });

    it('should throw NotFoundException if product is not found', async () => {
      const idProduct = '1';

      mockProductRepository.findOne.mockReturnValue(undefined);

      await expect(service.findOneProduct(idProduct)).rejects.toThrowError(
        'product not found'
      );
      expect(productRepository.findOne).toHaveBeenCalledWith({ idProduct });
    });
  });

  describe('createProduct', () => {
    it('should create and return a new product', async () => {
      const productDto: CreateProductDto = {
        productName: 'Product',
        description: 'test',
        price: 0,
        discount: 0,
        stock: 0,
        status: 'test',
      };
      const product = { idProduct: '1', ...productDto };

      mockProductRepository.create.mockReturnValue(product);

      const result = await service.createProduct(productDto);

      expect(result).toEqual(product);
      expect(productRepository.create).toHaveBeenCalledWith(productDto);
      expect(productRepository.persistAndFlush).toHaveBeenCalledWith(product);
    });
  });

  //   describe('UpdateProduct', () => {
  //     it('should update and return a product', async () => {
  //       const idProduct = '1';
  //       const updateProductDto: CreateProductDto = {};
  //     });
  //   });
});
