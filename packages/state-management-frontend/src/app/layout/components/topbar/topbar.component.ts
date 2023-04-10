import { Component } from '@angular/core';

import { MOCK_USER_LAYOUT } from '../../tests/layout-mocks';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  userData = MOCK_USER_LAYOUT;
}
