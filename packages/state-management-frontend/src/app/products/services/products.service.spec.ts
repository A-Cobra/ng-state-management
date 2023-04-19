import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClient } from '@angular/common/http';
import { MockHttpClient } from '../test/mocks';
import { PRODUCTS_CONTROLLER_VERSION } from './products-controller-version';
import { environment } from '../../environments/environment';

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
  // it('should call the get method getProductsByQueries once we call the getProducts method', () => {
  //   jest.spyOn(service, 'getProductsByQueries');
  //   service.getProducts();

  //   expect(service.getProductsByQueries).toHaveBeenCalledTimes(1);
  //   expect(service.getProductsByQueries).toHaveBeenCalledWith('', 1);
  // });

  // it('should call the get method from the HttpClient once we call the getProductsByQueries method', () => {
  //   const SEARCH_NAME = 'Alienware';
  //   const CURRENT_PAGE = 2;
  //   service.getProductsByQueries(SEARCH_NAME, CURRENT_PAGE);

  //   expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
  //   expect(mockHttpClient.get).toHaveBeenCalledWith(
  //     `${
  //       environment.apiBaseUrl
  //     }${PRODUCTS_CONTROLLER_VERSION}?search=${SEARCH_NAME.toLowerCase()}&page=${CURRENT_PAGE}&limit=10`
  //   );
  // });
  // WORKS
});
