import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import {
  ClappTopbarModule,
  ClappImageDisplayModule,
  ClappNotificationModule,
  NotificationService,
} from '@clapp1/clapp-angular';

import { TopbarComponent } from './topbar.component';
import { LayoutService } from '../../services/layout.service';
import { MOCK_USER_LAYOUT } from '../../tests/layout-mocks';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;
  let mockRouter: any;
  let mockLayoutService: any;

  beforeEach(async () => {
    mockLayoutService = {
      getUserData: jest.fn(() => of()),
    };
    mockRouter = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [TopbarComponent],
      imports: [
        RouterTestingModule,
        ClappTopbarModule,
        ClappImageDisplayModule,
        ClappNotificationModule,
      ],
      providers: [LayoutService],
    }).compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    mockLayoutService = TestBed.inject(LayoutService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the user profile when clicking on the profile picture', () => {
    const directlyInstantiatedComponent = new TopbarComponent(
      {} as LayoutService,
      mockRouter as Router,
      {} as NotificationService
    );
    directlyInstantiatedComponent.userData = MOCK_USER_LAYOUT;
    directlyInstantiatedComponent.goToProfile();
    //  TODO: update test route to [`/users/profile/${MOCK_USER_LAYOUT.id}`]
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/users/profile']);
  });

  it('should load the user data on init', () => {
    const mockUserData = MOCK_USER_LAYOUT;
    const getUserDataSpy = jest
      .spyOn(mockLayoutService, 'getUserData')
      .mockImplementation(() => of(mockUserData));
    component.ngOnInit();
    expect(getUserDataSpy).toHaveBeenCalled();
    expect(component.userData).toBe(mockUserData);
  });

  it('should render the user name and last name in the label', () => {
    component.userData = MOCK_USER_LAYOUT;
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label');
    expect(label.textContent.trim()).toEqual(
      `${MOCK_USER_LAYOUT.name} ${MOCK_USER_LAYOUT.lastName}`
    );
  });

  it('should show an error message if user data fails to load', () => {
    // Arrange
    const mockNotificationService = {
      error: jest.fn(),
    } as unknown as NotificationService;
    mockLayoutService = {
      getUserData: () =>
        throwError(() => new Error('Failed to load user data')),
    };
    const directlyInstantiatedComponent = new TopbarComponent(
      mockLayoutService,
      {} as Router,
      mockNotificationService
    );
    directlyInstantiatedComponent.ngOnInit();
    expect(mockNotificationService.error).toHaveBeenCalledWith(
      'Error loading user data, please try again later',
      'Error! '
    );
  });

  it('should call goToProfile() when the image container is clicked', () => {
    component.userData = MOCK_USER_LAYOUT;
    fixture.detectChanges();
    const imageContainer = fixture.debugElement.nativeElement.querySelector(
      '.topbar__image-container'
    );
    const goToProfileSpy = jest.spyOn(component, 'goToProfile');
    imageContainer.click();
    expect(goToProfileSpy).toHaveBeenCalled();
  });

  it('should unsubscribe from subscriptions on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component.unsubscribe$, 'next');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
