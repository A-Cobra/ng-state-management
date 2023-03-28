import { TestBed } from '@angular/core/testing';
import { CreateFormComponent } from './create-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ClappButtonModule,
  ClappTextInputModule,
  ClappInputHelpersModule,
  ClappSelectModule,
  ClappImageDisplayModule,
  ModalModule,
  ClappNotificationModule,
} from '@clapp1/clapp-angular';

describe('CreateFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ClappButtonModule,
        ClappTextInputModule,
        ClappInputHelpersModule,
        ClappSelectModule,
        ClappImageDisplayModule,
        ModalModule,
        ClappNotificationModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [CreateFormComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CreateFormComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
