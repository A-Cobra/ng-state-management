import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Branch } from '../../models/branch.model';

@Component({
  selector: 'app-branch-card',
  templateUrl: './branch-card.component.html',
  styleUrls: ['./branch-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchCardComponent {
  @Input() branch: Branch;
}
