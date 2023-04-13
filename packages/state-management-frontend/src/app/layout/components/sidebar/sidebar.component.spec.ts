import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import {
  ClappSideBarModule,
  ClappImageDisplayModule,
  NotificationService,
  ClappNotificationModule,
} from '@clapp1/clapp-angular';

import { SidebarComponent } from './sidebar.component';
import { LayoutService } from '../../services/layout.service';
import { MOCK_USER_LAYOUT } from '../../tests/layout-mocks';

export class ActivatedRouteStub {
  public paramMap = of({});
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockLayoutService: LayoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [
        RouterTestingModule,
        ClappSideBarModule,
        ClappImageDisplayModule,
        ClappNotificationModule,
      ],
      providers: [LayoutService],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an error message if roles fails to load', () => {
    // Arrange
    const mockNotificationService = {
      error: jest.fn(),
    } as unknown as NotificationService;
    mockLayoutService = {
      getUserData: jest.fn(() => of()),
      getRoles: () => throwError(() => new Error('Failed to load roles')),
    } as unknown as LayoutService;
    const directlyInstantiatedComponent = new SidebarComponent(
      mockLayoutService,
      mockNotificationService
    );
    directlyInstantiatedComponent.ngOnInit();
    expect(mockNotificationService.error).toHaveBeenCalledWith(
      'Error trying to get roles, please try again later',
      'Error! '
    );
  });

  it('should initialize isExpanded to false', () => {
    expect(component.isExpanded).toBe(false);
  });

  it('should toggle isExpanded to true', () => {
    component.navbarExpands();
    expect(component.isExpanded).toBe(true);
  });

  it('should unsubscribe from subscriptions on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component.unsubscribe$, 'next');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
