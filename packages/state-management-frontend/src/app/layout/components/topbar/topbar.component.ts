import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@clapp1/clapp-angular';
import { Subject, takeUntil } from 'rxjs';
import { UserLayout } from '../../models/layout.model';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  constructor(
    private layoutService: LayoutService,
    private route: Router,
    private notificationService: NotificationService
  ) {}
  private readonly unsubscribe$ = new Subject<void>();
  userData: UserLayout;

  ngOnInit(): void {
    this.layoutService
      .getUserData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (dataResponse) => {
          this.userData = dataResponse;
        },
        error: () =>
          this.notificationService.error(
            'Error loading user data, please try again later',
            'Error! '
          ),
      });
  }

  goToProfile() {
    this.route.navigate(['/profile']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
