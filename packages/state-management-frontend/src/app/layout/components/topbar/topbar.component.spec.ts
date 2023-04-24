import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';
import { TopbarComponent } from './topbar.component';
import { RoleLayout, UserLayout } from '../../models/layout.model';
import { LayoutService } from '../../services/layout.service';
import { MOCK_USER_LAYOUT } from '../../tests/layout-mocks';
import {
  ClappTopbarModule,
  ClappImageDisplayModule,
  ClappNotificationModule,
  NotificationService,
} from '@clapp1/clapp-angular';

@Component({
  selector: 'app-mock-user-profile',
  template: '<span>Mock user profile</span>',
})
class MockUserProfileComponent {}

const routes: Routes = [
  {
    path: 'users/profile',
    component: MockUserProfileComponent,
  },
];

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;
  let mockNotificationService: NotificationService;
  let router: Router;
  let mockLayoutService: {
    getUserData: () => Observable<UserLayout>;
    getRoles: () => Observable<RoleLayout[]>;
    uuidToNumber: (uuid: string) => number;
  };

  beforeEach(async () => {
    mockLayoutService = {
      getUserData: jest.fn(() => of(MOCK_USER_LAYOUT)),
      getRoles: jest.fn(),
      uuidToNumber: jest.fn(),
    };
    mockNotificationService = {
      error: jest.fn(),
    } as unknown as NotificationService;

    await TestBed.configureTestingModule({
      declarations: [TopbarComponent],
      imports: [
        RouterTestingModule.withRoutes(routes),
        ClappTopbarModule,
        ClappImageDisplayModule,
        ClappNotificationModule,
      ],
      providers: [
        { provide: LayoutService, useValue: mockLayoutService },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    mockLayoutService = TestBed.inject(LayoutService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('when component is destroyed', () => {
    it('should unsubscribe from subscriptions on destroy', () => {
      const unsubscribeSpy = jest.spyOn(component['unsubscribe$'], 'next');
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });

  describe('when the getUserData() call succeeds', () => {
    it('should load the user data on init', () => {
      component.ngOnInit();
      expect(mockLayoutService.getUserData).toHaveBeenCalled();
      expect(component.userData).toBe(MOCK_USER_LAYOUT);
    });

    it('should render the user name and last name in the label', () => {
      component.userData = MOCK_USER_LAYOUT;
      fixture.detectChanges();
      const label = fixture.nativeElement.querySelector('label');
      expect(label.textContent.trim()).toEqual(
        `${MOCK_USER_LAYOUT.name} ${MOCK_USER_LAYOUT.lastName}`
      );
    });

    it('should navigate to the user profile when clicking on the profile picture', () => {
      const navigateSpy = jest.spyOn(router, 'navigate');
      component.goToProfile();
      expect(navigateSpy).toHaveBeenCalledWith(['/profile']);
    });

    it('should call goToProfile() when the image container is clicked', () => {
      fixture.detectChanges();
      const imageContainer = fixture.debugElement.nativeElement.querySelector(
        '.topbar__image-container'
      );
      const goToProfileSpy = jest.spyOn(component, 'goToProfile');
      imageContainer.click();
      expect(goToProfileSpy).toHaveBeenCalled();
    });
  });

  describe('when the getUserData() call fails', () => {
    beforeEach(() => {
      mockLayoutService.getUserData = jest.fn(() =>
        throwError(() => new Error('Failed to load user data'))
      );
    });

    it('should show an error message', () => {
      component.ngOnInit();
      expect(mockLayoutService.getUserData).toHaveBeenCalled();
      expect(mockNotificationService.error).toHaveBeenCalledWith(
        'Error loading user data, please try again later',
        'Error! '
      );
    });
  });
});
