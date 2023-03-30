import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ClappButtonModule,
  ClappCardModule,
  ClappImageDisplayModule,
  ClappInputHelpersModule,
  ClappNoResultsModule,
  ClappPaginationModule,
  ClappSearchModule,
  ClappSelectModule,
  ClappTextInputModule,
} from '@clapp1/clapp-angular';

import { BranchCreateComponent } from './branch-create.component';

describe('BranchCreateComponent', () => {
  let component: BranchCreateComponent;
  let fixture: ComponentFixture<BranchCreateComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchCreateComponent],
      imports: [
        ClappButtonModule,
        ClappCardModule,
        ClappNoResultsModule,
        RouterTestingModule,
        ClappImageDisplayModule,
        ClappPaginationModule,
        ClappSearchModule,
        ClappSelectModule,
        ClappTextInputModule,
        ClappInputHelpersModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { url: [{ path: '1' }] } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BranchCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('typeForm should have changed to edit', () => {
    expect(component.typeForm).toBe('Edit');
  });
});
