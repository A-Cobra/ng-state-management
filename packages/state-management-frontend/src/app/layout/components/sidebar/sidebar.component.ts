import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NotificationService } from '@clapp1/clapp-angular';
import { LayoutService } from '../../services/layout.service';
import {
  headerBrand,
  logOutConfig,
  navigationOptions,
} from '../../utils/sidebar-options';
import { RoleLayout, UserLayout } from '../../models/layout.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  constructor(
    private notificationService: NotificationService,
    private layoutService: LayoutService
  ) {}

  navigationConfig = navigationOptions;
  logOutConfiguration = logOutConfig;
  headerBrandConfig = headerBrand;
  roles!: RoleLayout[];
  isExpanded = false;
  userData$!: Observable<UserLayout>;
  unsubscribe$: Subject<void> = new Subject<void>();

  uuidToNumber = this.layoutService.uuidToNumber;

  ngOnInit(): void {
    this.userData$ = this.layoutService.getUserData();
    this.layoutService.getRoles().subscribe({
      next: (res) => {
        // TODO: add roleIDs depending on each route (now every route has all the roles)
        (this.roles = res),
          this.roles.forEach((el) =>
            this.navigationConfig.forEach((elem) =>
              elem.allowedRoleIds.push(
                this.layoutService.uuidToNumber(el.roleId)
              )
            )
          );
      },
      error: () =>
        this.notificationService.error(
          'Error trying to get roles, please try again later',
          'Error! '
        ),
    });
  }
  logoOut(): void {
    // TODO: call LogOut function on auth service
  }

  navbarExpands(): void {
    this.isExpanded = !this.isExpanded;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
