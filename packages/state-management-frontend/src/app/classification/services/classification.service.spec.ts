import { TestBed } from '@angular/core/testing';
import { ClassificationService } from './classification.service';
import { take } from 'rxjs';
import { mocksClassification } from '../test/mocks';

describe('ClassificationService', () => {
  let service: ClassificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ClassificationService] });
    service = TestBed.inject(ClassificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a classification created', () => {
    service.arrClassification = mocksClassification.MOCK_ARRAY_CLASSIFICATION;

    service
      .addClassification(mocksClassification.MOCK_CLASSIFICATION_TO_CREATE)
      .pipe(take(1))
      .subscribe((response) => {
        expect(response).toEqual(mocksClassification.MOCK_CLASSIFICATION);
      });
  });

  it('should return a classification by Id', () => {
    service.arrClassification = mocksClassification.MOCK_ARRAY_CLASSIFICATION;

    service
      .getClassificationById('1uuid')
      .pipe(take(1))
      .subscribe((response) => {
        expect(response).toEqual(mocksClassification.MOCK_CLASSIFICATION);
      });
  });

  it('should return a error when classification is not exist', () => {
    service
      .getClassificationById('uuidNotExist')
      .pipe(take(1))
      .subscribe((response) => {
        expect(response).toThrowError('Classification not found.');
      });
  });

  it('should return a classification updated', () => {
    service
      .updateClassification(mocksClassification.MOCK_CLASSIFICATION)
      .pipe(take(1))
      .subscribe((response) => {
        expect(response).toEqual(mocksClassification.MOCK_CLASSIFICATION);
      });
  });

  it('should return a error when updating failed', () => {
    service
      .updateClassification(mocksClassification.MOCK_CLASSIFICATION_NOT_EXIST)
      .pipe(take(1))
      .subscribe((response) => {
        expect(response).toThrowError('Classification not found.');
      });
  });

  it('should return a message when classification deleted', () => {
    service
      .deleteClassification('1uuid')
      .pipe(take(1))
      .subscribe((response) => {
        expect(response).toBe('classification was deleted');
      });
  });

  it('should manage data to save ', () => {
    service.arrClassification = mocksClassification.MOCK_ARRAY_CLASSIFICATION;
    Storage.prototype.getItem = jest.fn(() => 'mockClassifications');
    jest.spyOn(window.localStorage, 'getItem').mockReturnValue(null);
    service.getDataFromStorage();

    expect(service.arrClassification).toEqual(
      mocksClassification.MOCK_ARRAY_CLASSIFICATION
    );
  });
});
