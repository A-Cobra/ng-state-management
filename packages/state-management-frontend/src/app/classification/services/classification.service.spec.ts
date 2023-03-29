import { TestBed } from '@angular/core/testing';

import { ClassificationService } from './classification.service';
import { take } from 'rxjs';
import {
  MOCK_ARRAY_CLASSIFICATION,
  MOCK_CLASSIFICATION,
  MOCK_CLASSIFICATION_NOT_EXIST,
  MOCK_CLASSIFICATION_TO_CREATE,
} from '../test/mocks';

describe('ClassificationService', () => {
  let service: ClassificationService;
  let localStore: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassificationService);
    localStore = {};
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a classification created', () => {
    service.arrClassification = MOCK_ARRAY_CLASSIFICATION;

    service
      .addClassification(MOCK_CLASSIFICATION_TO_CREATE)
      .pipe(take(1))
      .subscribe((response) => {
        expect(response).toEqual(MOCK_CLASSIFICATION);
      });
  });

  it('should return a classification by Id', () => {
    service.arrClassification = MOCK_ARRAY_CLASSIFICATION;

    service
      .getClassificationById('1uuid')
      .pipe(take(1))
      .subscribe((response) => {
        expect(response).toEqual(MOCK_CLASSIFICATION);
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
      .updateClassification(MOCK_CLASSIFICATION)
      .pipe(take(1))
      .subscribe((response) => {
        expect(response).toEqual(MOCK_CLASSIFICATION);
      });
  });

  it('should return a error when updating failed', () => {
    service
      .updateClassification(MOCK_CLASSIFICATION_NOT_EXIST)
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
    service.arrClassification = MOCK_ARRAY_CLASSIFICATION;
    Storage.prototype.getItem = jest.fn(() => 'mockClassifications');
    jest.spyOn(window.localStorage, 'getItem').mockReturnValue(null);
    service.getDataFromStorage();

    expect(service.arrClassification).toEqual(MOCK_ARRAY_CLASSIFICATION);
  });
});
