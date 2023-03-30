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

export const MOCK_CLASSIFICATIONS_LIST = [
  {
    id: '1',
    image: '',
    name: 'Category 1',
    numberOfBusinesses: 3,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec justo vel odio porta lobortis sit amet eu sem. In nec varius purus. Cras ante nunc, sollicitudin sit amet nisl. ',
  },
  {
    id: '2',
    image: '',
    name: 'Category 2',
    numberOfBusinesses: 2,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec justo vel odio porta lobortis sit amet eu sem. In nec varius purus. Cras ante nunc, sollicitudin sit amet nisl. ',
  },
  {
    id: '3',
    image: '',
    name: 'Category 3',
    numberOfBusinesses: 2,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec justo vel odio porta lobortis sit amet eu sem. In nec varius purus. Cras ante nunc, sollicitudin sit amet nisl. ',
  },
  {
    id: '4',
    image: '',
    name: 'Category 4',
    numberOfBusinesses: 1,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec justo vel odio porta lobortis sit amet eu sem. In nec varius purus. Cras ante nunc, sollicitudin sit amet nisl. ',
  },
  {
    id: '5',
    image: '',
    name: 'Category 5',
    numberOfBusinesses: 5,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec justo vel odio porta lobortis sit amet eu sem. In nec varius purus. Cras ante nunc, sollicitudin sit amet nisl. ',
  },
  {
    id: '6',
    image: '',
    name: 'Category 6',
    numberOfBusinesses: 5,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec justo vel odio porta lobortis sit amet eu sem. In nec varius purus. Cras ante nunc, sollicitudin sit amet nisl. ',
  },
  {
    id: '7',
    image: '',
    name: 'Category 7',
    numberOfBusinesses: 0,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec justo vel odio porta lobortis sit amet eu sem. In nec varius purus. Cras ante nunc, sollicitudin sit amet nisl. ',
  },
  {
    id: '8',
    image: '',
    name: 'Category 8',
    numberOfBusinesses: 5,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec justo vel odio porta lobortis sit amet eu sem. In nec varius purus. Cras ante nunc, sollicitudin sit amet nisl. ',
  },
  {
    id: '9',
    image: '',
    name: 'Category 9',
    numberOfBusinesses: 5,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec justo vel odio porta lobortis sit amet eu sem. In nec varius purus. Cras ante nunc, sollicitudin sit amet nisl. ',
  },
  {
    id: '10',
    image: '',
    name: 'Category 10',
    numberOfBusinesses: 0,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec justo vel odio porta lobortis sit amet eu sem. In nec varius purus. Cras ante nunc, sollicitudin sit amet nisl. ',
  },
  {
    id: '11',
    image: '',
    name: 'Category 11',
    numberOfBusinesses: 5,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec justo vel odio porta lobortis sit amet eu sem. In nec varius purus. Cras ante nunc, sollicitudin sit amet nisl. ',
  },
  {
    id: '12',
    image: '',
    name: 'Category 12',
    numberOfBusinesses: 5,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec justo vel odio porta lobortis sit amet eu sem. In nec varius purus. Cras ante nunc, sollicitudin sit amet nisl. ',
  },
];

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
