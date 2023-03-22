import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchCardComponent } from './branch-card.component';
import { MOCK_BRANCH } from '../../test/mocks';

import { ClappCardModule } from '@clapp1/clapp-angular';

describe('BranchCardComponent', () => {
  let component: BranchCardComponent;
  let fixture: ComponentFixture<BranchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchCardComponent],
      imports: [ClappCardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BranchCardComponent);
    component = fixture.componentInstance;
    component.branch = MOCK_BRANCH;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render branch information', () => {
    expect(fixture).toMatchSnapshot();
  });
});
