import { TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ClappInputHelpersModule,
  ClappTextInputModule,
} from '@clapp1/clapp-angular';

describe('UserProfileComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        ClappTextInputModule,
        ClappInputHelpersModule,
      ],
      declarations: [UserProfileComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UserProfileComponent);
    const userProfileComponent = fixture.componentInstance;
    expect(userProfileComponent).toBeTruthy();
  });
});
