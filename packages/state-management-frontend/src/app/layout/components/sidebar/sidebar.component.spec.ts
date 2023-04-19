import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';
import {
  ClappSideBarModule,
  ClappImageDisplayModule,
  NotificationService,
  ClappNotificationModule,
} from '@clapp1/clapp-angular';

import { SidebarComponent } from './sidebar.component';
import { LayoutService } from '../../services/layout.service';
import { RoleLayout, UserLayout } from '../../models/layout.model';
import { MOCK_USER_LAYOUT } from '../../tests/layout-mocks';

export class ActivatedRouteStub {
  public paramMap = of({});
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockNotificationService: NotificationService;
  let mockLayoutService: {
    getUserData: () => Observable<UserLayout>;
    getRoles: () => Observable<RoleLayout[]>;
    uuidToNumber: (uuid: string) => number;
  };

  beforeEach(async () => {
    mockLayoutService = {
      getUserData: jest.fn(() => of(MOCK_USER_LAYOUT)),
      getRoles: () => throwError(() => new Error('Failed to load roles')),
      uuidToNumber: jest.fn(),
    };
    mockNotificationService = {
      error: jest.fn(),
    } as unknown as NotificationService;
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [
        RouterTestingModule,
        ClappSideBarModule,
        ClappImageDisplayModule,
        ClappNotificationModule,
      ],
      providers: [
        { provide: LayoutService, useValue: mockLayoutService },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    mockLayoutService = TestBed.inject(LayoutService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an error message if roles fails to load', () => {
    component.ngOnInit();
    expect(mockNotificationService.error).toHaveBeenCalledWith(
      'Error trying to get roles, please try again later',
      'Error! '
    );
  });

  it('should initialize isExpanded to false', () => {
    expect(component.isExpanded).toBe(false);
  });

  it('should toggle isExpanded to true', () => {
    component.onNavbarExpand();
    expect(component.isExpanded).toBe(true);
  });

  it('should unsubscribe from subscriptions on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component['unsubscribe$'], 'next');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
