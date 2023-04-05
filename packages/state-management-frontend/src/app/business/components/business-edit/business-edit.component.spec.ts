import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { BusinessEditComponent } from './business-edit.component';
import { MockActivatedRoute } from '../../test/mocks';
import { ReactiveFormControlTextInputComponent } from '../../../shared/components/reactive-form-control-text-input/reactive-form-control-text-input.component';
import { BusinessEditFormComponent } from '../business-edit-form/business-edit-form.component';
import { FloatNumberOrNumberRangeDirective } from '../../../shared/directives/float-number-or-number-range.directive';
import { OnlyNumberDirective } from '../../../shared/directives/only-number.directive';
import { MockModalService } from '../../test/mock-modal-service.interface';
import {
  ClappButtonModule,
  ClappImageDisplayModule,
  ClappSearchModule,
  ModalService,
} from '@clapp1/clapp-angular';
import { ReactiveFormsModule } from '@angular/forms';

describe('BusinessEditComponent', () => {
  let component: BusinessEditComponent;
  let fixture: ComponentFixture<BusinessEditComponent>;
  let mockModalService: MockModalService;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(async () => {
    mockActivatedRoute = new MockActivatedRoute();
    await TestBed.configureTestingModule({
      imports: [
        ClappButtonModule,
        ClappButtonModule,
        ClappImageDisplayModule,
        ClappSearchModule,
        ReactiveFormControlTextInputComponent,
        FloatNumberOrNumberRangeDirective,
        OnlyNumberDirective,
        ReactiveFormsModule,
      ],
      declarations: [BusinessEditComponent, BusinessEditFormComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: ModalService,
          useValue: mockModalService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should activate the queryError flag once we navigate to a route that doesn't contain a number", () => {
    const urlParams = { id: 'notValidId' };
    mockActivatedRoute.params = urlParams;

    expect(component.hasQueryError).toBe(true);
  });
});
