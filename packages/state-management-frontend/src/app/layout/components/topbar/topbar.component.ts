import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserLayout } from '../../models/layout.interface';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  constructor(private layoutService: LayoutService, private route: Router) {}
  userData: UserLayout;
  unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.layoutService.getUserData().subscribe({
      next: (res) => {
        this.userData = res;
      },
      error: (err) => console.log(err), // TODO: add notification
    });
  }

  goToProfile() {
    this.route.navigate([`/users/profile/${this.userData.id}`]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
