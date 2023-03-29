import { BusinessService } from './business.service';
import { Classification } from '../models/classification.interface';
import { Business } from '../models/business.interface';
import { of } from 'rxjs';

describe('BusinessService', () => {
  let service: BusinessService;

  beforeEach(() => {
    service = new BusinessService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return classifications', () => {
    const expectedClassifications: Classification[] = [
      { id: '1', name: 'Category 1', description: 'Category 1' },
      { id: '2', name: 'Category 2', description: 'Category 2' },
      { id: '3', name: 'Category 3', description: 'Category 3' },
    ];

    jest
      .spyOn(service, 'getClassifications')
      .mockReturnValue(of(expectedClassifications));

    service.getClassifications().subscribe((classifications) => {
      expect(classifications).toEqual(expectedClassifications);
    });
  });

  it('should add a new business', () => {
    const business: Business = {
      name: 'New Business',
      email: 'newbusiness@example.com',
      password: 'Example!1',
      classification: 'Category 1',
      address: '123 Main St',
      longitude: '0',
      latitude: '0',
      contact: '555-5555',
      picture: '',
      bankAccountNumber: '1234567890',
      bankName: '',
      bankAccountType: '',
      fullname: 'John Doe',
      documentId: '1234567890',
    };

    jest.spyOn(service, 'addNewBusiness').mockReturnValue(of(true));

    service.addNewBusiness(business).subscribe((result) => {
      expect(result).toBeTruthy();
    });
  });
});
