import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import {
  ClappSideBarModule,
  ClappImageDisplayModule,
  ClappNotificationModule,
} from '@clapp1/clapp-angular';

import { SidebarComponent } from './sidebar.component';
import { LayoutService } from '../../services/layout.service';

export class ActivatedRouteStub {
  public paramMap = of({});
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockLayoutService: any;

  beforeEach(async () => {
    mockLayoutService = {
      getUser: jest.fn(() => of()),
    };

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
});
