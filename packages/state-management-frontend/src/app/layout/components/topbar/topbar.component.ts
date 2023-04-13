import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NotificationService } from '@clapp1/clapp-angular';
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
  userData: UserLayout;
  unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.layoutService.getUserData().subscribe({
      next: (res) => {
        this.userData = res;
      },
      error: () =>
        this.notificationService.error(
          'Error loading user data, please try again later',
          'Error! '
        ),
    });
  }

  goToProfile() {
    this.route.navigate(['/users/profile']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
