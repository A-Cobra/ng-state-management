import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClient } from '@angular/common/http';
import { API_URL, MockHttpClient } from '../test/mocks';

describe('ProductsService', () => {
  let service: ProductsService;
  let mockHttpClient: MockHttpClient;

  beforeEach(() => {
    mockHttpClient = {
      get: jest.fn(),
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        ProductsService,
      ],
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // WORKS
  // it('should call the get method from the HttpClient once we call the getProducts method', () => {
  //   service.getProducts();

  //   expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
  //   expect(mockHttpClient.get).toHaveBeenCalledWith(API_URL);
  // });

  // it('should call the get method from the HttpClient once we call the getProductsByName method', () => {
  //   const SEARCH_NAME = 'Alienware'.toLowerCase();
  //   const CURRENT_PAGE = 2
  //   service.getProductsByQueries(SEARCH_NAME, CURRENT_PAGE);

  //   expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
  //   expect(mockHttpClient.get).toHaveBeenCalledWith(
  //     `${API_URL}?search=${searchName.toLowerCase()}&page=${currentPage}&limit=10`
  //   );
  // });
  // WORKS
});
