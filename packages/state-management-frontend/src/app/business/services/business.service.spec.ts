import { BusinessService } from './business.service';
import { of } from 'rxjs';
import { MOCK_CLASSIFICATIONS, MOCK_BUSINESS } from '../test/mocks';

describe('BusinessService', () => {
  let service: BusinessService;

  beforeEach(() => {
    service = new BusinessService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return classifications', () => {
    const expectedClassifications = MOCK_CLASSIFICATIONS;

    jest
      .spyOn(service, 'getClassifications')
      .mockReturnValue(of(expectedClassifications));

    service.getClassifications().subscribe((classifications) => {
      expect(classifications).toEqual(expectedClassifications);
    });
  });

  it('should add a new business', () => {
    const business = MOCK_BUSINESS;

    jest.spyOn(service, 'addNewBusiness').mockReturnValue(of(true));

    service.addNewBusiness(business).subscribe((result) => {
      expect(result).toBeTruthy();
    });
  });
});
