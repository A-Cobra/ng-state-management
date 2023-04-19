import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, takeUntil } from 'rxjs';
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
    private layoutService: LayoutService,
    private notificationService: NotificationService
  ) {}
  private readonly unsubscribe$ = new Subject<void>();
  navigationConfig = navigationOptions;
  logOutConfiguration = logOutConfig;
  headerBrandConfig = headerBrand;
  roles!: RoleLayout[];
  isExpanded = false;
  userData$!: Observable<UserLayout>;

  uuidToNumber = this.layoutService.uuidToNumber;

  ngOnInit(): void {
    this.userData$ = this.layoutService.getUserData();
    this.layoutService
      .getRoles()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (roleResponse) => {
          // TODO: add roleIDs depending on each route (now every route has all the roles)
          this.roles = roleResponse;
          this.roles.forEach((role) =>
            this.navigationConfig.forEach((elem) =>
              elem.allowedRoleIds.push(
                this.layoutService.uuidToNumber(role.roleId)
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
  onLogOut(): void {
    // TODO: call LogOut function on auth service
  }

  onNavbarExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
