import { Test } from '@nestjs/testing';
import { ProductsController } from '../controllers/products.controller';
import { ProductsService } from '../services/products.service';
import { Product } from '../entities/product.entity';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProducts: Product[] = [
    {
      productName: 'Test Product',
      description: 'Test Product Description',
      price: 10,
      discount: 0,
      stock: 0,
      status: 'test',
      idProduct: 'uuid',
    },
    {
      productName: 'Test Product2',
      description: 'Test Product Description',
      price: 20,
      discount: 0,
      stock: 0,
      status: 'test2',
      idProduct: 'uuid2',
    },
  ];
  const mockProductsService = {
    findAllProducts: jest.fn().mockResolvedValue({
      data: [mockProducts],
      currentPage: 1,
      totalItems: 1,
      totalPages: 1,
    }),
    findOneProduct: jest.fn((id) => {
      return mockProducts.find((product) => product.idProduct === id);
    }),
    createProduct: jest.fn((product) => {
      return {
        idProduct: product.idProduct,
        productName: product.productName,
        description: product.description,
        price: product.price,
        discount: product.discount,
        stock: product.stock,
        status: product.status,
      };
    }),
    UpdateProduct: jest.fn((id, product) => {
      const productToUpdate = mockProducts.find(
        (productFinded) => productFinded.idProduct === id
      );
      return { ...productToUpdate, ...product };
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    })
      .overrideProvider(ProductsService)
      .useValue(mockProductsService)
      .compile();

    controller = moduleRef.get<ProductsController>(ProductsController);
    service = moduleRef.get<ProductsService>(ProductsService);
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = await controller.findAll('', 1, 10);
      expect(result).toEqual({
        data: [mockProducts],
        currentPage: 1,
        totalItems: 1,
        totalPages: 1,
      });
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const result = await controller.findOne('uuid2');
      expect(result).toEqual(mockProducts[1]);
    });
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      const createProductDto: Product = {
        idProduct: 'uuid1',
        productName: 'Test Product',
        description: 'Test Product Description',
        price: 10,
        discount: 0,
        stock: 0,
        status: 'test',
      };
      const result = await controller.createProduct(createProductDto);
      expect(result).toEqual(createProductDto);
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const productInfo: Product = {
        productName: 'Test Product Updated',
        description: 'Test Product Description',
        price: 10,
        discount: 0,
        stock: 0,
        status: 'test',
        idProduct: 'uuid',
      };
      const result = await controller.updateProduct('uuid', productInfo);
      expect(result).toEqual(productInfo);
    });
  });

  describe('partialUpdate', () => {
    it('should update a product partially', async () => {
      const productInfo: Partial<Product> = {
        productName: 'Test Product Updated',
      };
      const result = await controller.partialUpdate('uuid2', productInfo);
      const productUpdated = { ...mockProducts[1], ...productInfo };
      expect(result).toEqual(productUpdated);
    });
  });
});
