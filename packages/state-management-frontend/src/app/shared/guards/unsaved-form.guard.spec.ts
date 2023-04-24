import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  CanDeactivateFn,
  RouterStateSnapshot,
} from '@angular/router';

import { MockModalService } from '../test/mocks';
import { mockActivatedRoute } from '../../product-categories/test/mocks';
import { UnsavedForm } from '../models/unsaved-form.model';
import { unsavedFormGuard } from './unsaved-form.guard';

import { ModalService } from '@clapp1/clapp-angular';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

fdescribe('unsavedFormGuard', () => {
  let route: ActivatedRoute;
  let modalService: ModalService;
  const executeGuard: CanDeactivateFn<UnsavedForm> = (
    component,
    activatedRoute,
    state,
    nextState
  ) =>
    TestBed.runInInjectionContext(() =>
      unsavedFormGuard(component, activatedRoute, state, nextState)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: ModalService,
          useClass: MockModalService,
        },
      ],
    });

    route = TestBed.inject(ActivatedRoute);
    modalService = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if form is saved', () => {
    const mockComponent: UnsavedForm = {
      isFormSaved: () => true,
    };

    const result = executeGuard(
      mockComponent,
      route.snapshot,
      {} as RouterStateSnapshot,
      {} as RouterStateSnapshot
    ) as Observable<boolean>;

    result.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(true);
    });
  });

  it('should leave the page if user confirms the modal and form is not saved', (done) => {
    const mockComponent: UnsavedForm = {
      isFormSaved: () => false,
    };
    ((<unknown>modalService) as MockModalService).value = true;

    const result = executeGuard(
      mockComponent,
      route.snapshot,
      {} as RouterStateSnapshot,
      {} as RouterStateSnapshot
    ) as Observable<boolean>;

    result.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(true);
      done();
    });
  });

  it('should not leave the page if user confirms the modal and form is not saved', (done) => {
    const mockComponent: UnsavedForm = {
      isFormSaved: () => false,
    };

    const result = executeGuard(
      mockComponent,
      route.snapshot,
      {} as RouterStateSnapshot,
      {} as RouterStateSnapshot
    ) as Observable<boolean>;

    result.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(false);
      done();
    });
  });
});
