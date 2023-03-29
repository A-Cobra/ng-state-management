import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Classification } from '../models/api-response.model';
import { ModalRef } from '@clapp1/clapp-angular';

export const MOCK_ARRAY_CLASSIFICATION: Classification[] = [
  {
    description: 'mock description',
    id: '1uuid',
    image: 'assets/img/placeholder-image.png',
    name: 'mock name',
    numberOfBusinesses: 0,
  },
];
export const MOCK_CLASSIFICATION: Classification = {
  description: 'mock description',
  id: '1uuid',
  image: 'assets/img/placeholder-image.png',
  name: 'mock name',
  numberOfBusinesses: 0,
};

export const MOCK_CLASSIFICATION_TO_CREATE: Classification = {
  description: 'mock description',
  image: 'assets/img/placeholder-image.png',
  name: 'mock name',
  numberOfBusinesses: 0,
};

export const MOCK_CLASSIFICATION_NOT_EXIST: Classification = {
  description: '',
  id: 'noExist',
  image: '',
  name: '',
  numberOfBusinesses: 0,
};

export const MOCK_CLASSIFICATION_SERVICE = {
  getClassificationById: jest.fn((id: string): Observable<Classification> => {
    if (id !== MOCK_CLASSIFICATION.id) {
      return throwError(() => new Error('Classification not found.'));
    }
    return of(MOCK_CLASSIFICATION);
  }),

  addClassification: jest.fn(
    (data: Classification): Observable<Classification> => {
      if (data.id) {
        return throwError(() => new Error('Classification not created.'));
      }
      return of(MOCK_CLASSIFICATION);
    }
  ),
  updateClassification: jest.fn(
    (data: Classification): Observable<Classification> => {
      if (data.id !== MOCK_CLASSIFICATION.id) {
        return throwError(() => new Error('Classification not updated.'));
      }
      return of(MOCK_CLASSIFICATION);
    }
  ),
  deleteClassification: jest.fn((id: string): Observable<string> => {
    if (id !== MOCK_CLASSIFICATION.id) {
      return throwError(() => new Error('Classification not deleted.'));
    }
    return of('classification was deleted');
  }),
};

export const PARAM_MAP_MOCK = {
  get: jest.fn().mockReturnValue('1uuid'),
};

export const MOCK_ACTIVATED_ROUTER = {
  snapshot: {
    data: {
      status: '',
    },
    firstChild: { data: { status: '' } },
  },
  paramMap: {
    subscribe: jest
      .fn()
      .mockImplementation((callback) => callback(PARAM_MAP_MOCK)),
  },
};

export class MockModalService {
  private value$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  set value(newValue: boolean) {
    this.value$.next(newValue);
  }

  open(): ModalRef {
    return {
      afterClosed: this.value$.asObservable() as Observable<unknown>,
    } as ModalRef;
  }
}
